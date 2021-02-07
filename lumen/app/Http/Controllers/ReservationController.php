<?php

namespace App\Http\Controllers;

use App\Mail\cancelation;
use App\Mail\reservation as reser;
use App\Reservation;
use App\Table;
use App\User;
use App\Reduction;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Mail\coupon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
//public function reserver($table,$client,$date,$heure){
//
//
//    $state =Table::find($table)->etat;
//    if ($state==1)
//        return "table is already reserved";
//    elseif ($state==0){
//        $reservation = new Reservation;
//        //$reservation->id=$id;
//        $reservation->idTable=$table;
//        $reservation->idClient=$client;
//        $reservation->DateReserv=$date;
//        $reservation->heuresReserv=$heure;
//        $reservation->save();
//        Table::where('id',$table)->update(['etat'=>1]);
//        if ($reservation)
//            return "booking complete";
//    }
//}
    public  function checkRole($token){
        $user = User::where('api_token',$token);
        if ($user)
            return (($user->first()->role_id == 1)||($user->first()->api_token ==$token));
        else
            return null;
    }
    public function checkTime($hour, $date){

        if (Carbon::parse($date)>=Carbon::today()){
            if ((Carbon::now()->addHour(2)->gt(Carbon::parse($hour)))
                && Carbon::today()->eq(Carbon::parse($date)))

                return null;
            else
                return $hour;
        }
        return null;
    }
    public function checkReservation($date, $time, $reservations, $duration){

        foreach ($reservations as $reservation){
            $res = Carbon::parse($reservation->reservation_time);

            if ((((Carbon::parse($time)->addHours($duration))->gt($res)
                        && (Carbon::parse($time)->lte($res)))
                    || (Carbon::parse($time)->gte($res)
                        && Carbon::parse($time)->lt($res->addHours($reservation->duration))))
                && ($reservation->reservation_date == $date)){

                return $reservation;    //time conflict=>
            }
        }
        return null;
    }


    public function checkDate($date){
        if (!Carbon::parse($date)->isToday())
            return $date;
        else
            return null;
    }


    public function update(Request $request, $id)
    {
        if ($this->checkTime($request->reservation_date,$request->reservation_date)){
            if ((!$this->checkReservation($request->reservation_date, $request->reservation_time,
                $request->position, $request->duration))){
                $var = Reservation::find($id);
                $var->update($request->all());
                return response()->json($var);
            }else
                return "there is already a reservation";

        }else
        return 'please, choose a valid time, it has to be at least 2 hours from now';
    }

    public function view(Request $request)
    {
        $user = User::where('api_token',$request->api_token)->first();
        $reservations = $user->reservations()->get();
        $reservations= $reservations->where('reservation_date','>=',Carbon::today());
        if ($reservations)
            return response()->json($reservations);
        else
            return 'there is no incoming reservations';

    }

    public function index()
    {
        $var = Reservation::where('reservation_date','>=',Carbon::today())->get();
        $reservations = array();
        if ($var){
            foreach ($var as $item){
                $item['name'] = User::findOrFail($item->user_id)->name;

                array_push($reservations,$item);
            }
            return response()->json($reservations);

        }

        return 'there is no incoming reservations';
    }

    public function checkTable($id, $date)
    {
        $tables = Reservation::where('position', $id)->get();   // reservations de la table X
        if (!Table::where('position',$id)->first()) {
            return "table doesn't exist";
        }
//        else {
//            foreach ($tables as $table) {
//                if (!Carbon::parse($table->reservation_date)->addHour(3)->lt(Carbon::parse($date)))
//                    return $date;
//            }
//        }


        return null;
    }

    public function reserver(Request $request)
    {
        //$id = Table::where('position',$request->position)->first()->id;
        if ($this->checkTable($request->position, $request->reservation_date))
            return "table is already reserved or table doesn't exist";
        elseif ($request->duration>3)
            return response()->json(['erroe'=>'duration can\'t exceed 3 hours']);
        elseif($this->checkTime($request->reservation_time,$request->reservation_date)) {
            $reservations = Reservation::where('position',$request->position)->get();
            if ((!$this->checkReservation($request->reservation_date, $request->reservation_time, $reservations, $request->duration))){
                $reservation = new Reservation;
                $reservation->user_id = Auth::user()->id;
                $reservation->reservation_date = $request->reservation_date;
                $reservation->reservation_time = $request->reservation_time;
                $reservation->position = $request->position;
                $reservation->duration = $request->duration;
            }else
            return response()->json(["error"=>"there is already a reservation"],400);

//        $reservation->DateReserv=$request->DateReserv;
//        $reservation->heuresReserv=$request->heuresReserv;
            Mail::send(
                (new reser(
                    Auth::user()->email,
                    Auth::user()->name,
                    $reservation->reservation_date
                ))
            );
            $reservation->save();

            return response()->json($reservation,201) . "booking complete";
        }else
            return "please, choose a valid time, it has to be at least 2 hours from now";
    }

    public function delete(Request $request, $id)
    {
        $var = Reservation::find($id);
        if ($var){
            if (Auth::user()->reservations()->get(['id'])->contains($id) || $this->checkRole($request->api_token)){
                if ($this->checkDate($var->reservation_date)) {
                    $var->delete();

                    Mail::send(
                        ( new cancelation(
                            User::where('api_token',$request->api_token)
                                ->first()->email,
                            User::where('api_token',$request->api_token)
                                ->first()->name,
                            Carbon::now()

                        )));
                    return "successfully deleted !!";
                }
                else
                    return "you cannot cancel the reservations of current day";
            }
            return 'got ya little hacker';
        }else
            return "the table is already free !!";
    }

    public static function exptionDelete($id){
        $reservation = Reservation::find($id)->delete();
    }

    public function dailyReservations(Request $request){
        $user = User::where('api_token',$request->api_token);
        if ($user)
            if ($user->first()->role_id == 3)
        {
            $reservations = DB::table('reservations')->select('name','username',
                'reservation_date','reservation_time','duration')
                ->where('reservation_date',Carbon::today())
                ->join('users','users.id','=','reservations.user_id')
                ->get();


            return $reservations;
        }
        return response()->json(
            ['error'=>'you must be a supervisor to perform this action'],401);
    }

    public function findReservationByname(Request $request){
        $user = User::where('api_token',$request->api_token)->first();
        if ($user)
            if ($user->role_id == 3)
            {
                $users = User::where('name','like','%'.$request->input('name').'%')
                    ->orWhere('username','like','%'.$request->input('username').'%')->get();
                $reservations = new Collection();
                foreach ($users as $u){

                        $resers= $u->reservations()->where('reservation_date','>=',Carbon::today())->get();
                        foreach ($resers as $reser)
                        $reservations->push($reser['name'] = User::findorFail($reser->user_id));


                }
                return $reservations;
            }
        return 'you must be a supervisor to perform this action';
    }

    public function possibleReservations(Request $request){

        $tables = Table::all();
        $availableTables = new Collection();
        foreach ($tables as $table){
            $reservations = $table->reservations()->get();
                if (!$this->checkReservation($request->reservation_date, $request->reservation_time,
                    $reservations, $request->duration)){
                    $availableTables->push($table);
                }
        }
//
        return $availableTables;
    }

    public function identify($token)
    {
        return User::where('api_token', $token)->first()->id;
    }
}
