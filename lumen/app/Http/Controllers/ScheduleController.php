<?php

namespace App\Http\Controllers;

use App\ExceptionPeriod;
use App\Mail\exceptions;
use App\Mail\golden;
use App\Mail\registration;
use App\Reservation;
use App\Schedule;
use App\User;
use App\Valid;
use http\Env\Response;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;


class ScheduleController extends Controller
{
    public function createEdit(Request $request){


        if ($request->input('id')!="")
            return $this->updateException($request,$request->id);
        else
            return $this->addException($request);
    }

    public function create(Request$request){



        $schedule = Schedule::create($request->all());
        return response()->json($schedule);
    }

    public  function update(Request $request){
        //if ((!$request->exception==null) && (!$request->exception_duration==null)){

        $schedule = Schedule::findOrfail(1);
        if ($request->opening_day != "")
                    $schedule->update(['opening_day'=>$request->opening_day]);
        if ($request->closing_day != "")
            $schedule->update(['closing_day'=>$request->closing_day]);
        if ($request->opening_time != "")
            $schedule->update(['opening_time'=>$request->opening_time]);
        if ($request->closing_time != "")
            $schedule->update(['closing_time'=>$request->closing_time]);

                $schedule->save();
        $weekMap = [
            'su' => 0,
            'mo' => 1,
            'tu' => 2,
            'we' => 3,
            'th' => 4,
            'fr' => 5,
            'sa' => 6,
        ];
                $reservations =Reservation::where([
                    ['reservation_time','>=',$schedule->closing_time]])
                    ->orWhere([['reservation_time','<=',$schedule->opening_time]]);

                foreach ($reservations as $reservation){
                    $reservation->delete();
                }
                return $schedule;
    }

    public function viewSchedule(){
        return Schedule::first();
    }

    public function exceptionDates(){
        $exceptions =new Collection();

        $exp = ExceptionPeriod::all();
        foreach ($exp as $e){
            if (Carbon::parse($e->exception_date)->addDays($e->duration)->gte(Carbon::now()))
                $exceptions->push($e);
        }
        return $exceptions;
    }

    public function index(){
    $exceptions =new Collection();

    $exp = ExceptionPeriod::all();
    foreach ($exp as $e){

        for($i=1;$i<=$e->duration;$i++)
            $exceptions->push(Carbon::parse($e->exception_date)->addDays($i)->toDateString());
    }
    return $exceptions;
    }

    public function test(Request $request){

//        $data=$this->validate($request,[
//            'name'=>['required', new Valid()]
//        ]);
        $email ='margo@gmail.com';
        $reason='Saveur team invite you discovers its menus';
        $name = 'Djamel';
//        Mail::send(
//            ( new golden(
//                $email,
//                $reason
//            ))
//
//        );


        return View('emails.design.test',compact('email','name','reason'));

    }
    public function test2(Request $request){


        $email ='margo@gmail.com';
        $reason='Saveur team invite you discovers its menus';
        $name = 'Djamel';


        return View('emails.design.event',compact('email','name','reason'));

    }

    public function addException(Request $request){

//        $exception = new ExceptionPeriod();
//        $exception->exception_date=$request->exception_date;
//        $exception->duration=$request->duration;
//        $exception->schedule_id=1;
//        $exception->save();
        $this->validate(
            $request,
            ['exception_date'=>['required', new Valid()]
        ]);
        $exception = ExceptionPeriod::create($request->all());

        $reservatons = Reservation::where('reservation_date','>=',$request->exception_date)
            ->where('reservation_date','<=',Carbon::parse($request->exception_date)
                ->addDays($request->duration))
            ->get();
        $contact = new Collection();
        foreach ($reservatons as $reservaton){
            if (!$contact->contains($reservaton->user_id)){
                echo 'r';
                Mail::send(
                    ( new exceptions(
                        User::find($reservaton->user_id)->email,
                        User::find($reservaton->user_id)->name,
                        $request->exception_date,
                        Carbon::parse($request->exception_date)
                            ->addDays($reservaton->duration)->toDateString()
                    ))

                );
                $contact->push($reservaton->user_id);

            }
            $reservaton->delete();
        }

        return response()->json($exception);

    }

    public function updateException(Request $request, $id){
        $exception = ExceptionPeriod::find($id);
        if ($request->exception_date != "null"){
            $this->validate(
                $request,
                ['exception_date'=>['required', new Valid()]
                ]);
            $exception->update(['exception_date'=>$request->exception_date]);

        }
        if ($request->duration != "")
            $exception->update(['duration'=>$request->duration]);

        $exception->save();
        return response()->json($exception);
    }

    public function deleteException($id){

        $exception = ExceptionPeriod::find($id);
        if($exception)
            $exception->delete();
        return response()->json("removed successfully !");

    }
}
