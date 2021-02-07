<?php

namespace App\Http\Controllers;

use App\Mail\coupon;
use App\Photo;
use App\Product;
use App\Reduction;
use App\Reservation;
use App\User;
use App\Valide\unsigned;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;

class ReductionController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin',['except'=>['index','view','retrieve','activateReduction','validateReservation']]);
    }
    //
    public  function checkRole($token){
        $user = User::where('api_token',$token);
        if ($user)
            return ($user->first()->role_id == 3);
        else
            return null;
    }
    public function createEdit(Request $request){
        if ($request->input('id')!="")
            return $this->update($request,$request->id);
        else
            return $this->create($request);
    }

    public function create(Request $request){

        $this->validate($request,['duration' => new unsigned()]);
            if ($request->input('type')=='percentage')
                if ($request->input('value')>25)
                    return 'impossible to set a value more than 25%';
            $var = Reduction::create($request->all());

        if (Input::hasFile('reductionPicture')){
            $pic = Input::file('reductionPicture');
            $pic->move('coupons',$pic->getClientOriginalName());

            $photo = new Photo();
            $photo->imageable_id = $var->id;
            $photo->path = "http://lumen.test/coupons/".$pic->getClientOriginalName();
            $photo->imageable_type = "App\Reduction";
            $photo->save();


        }
            return response()->json($var);

    }

    public  static function bonus($id, $user_id){
        $reservations = DB::table('reservations')->select('reservation_date')
            ->where('user_id',$user_id)
            ->where('reservation_date','>=',Carbon::now()->subDays(7))
            ->where('reservation_date','<=',Carbon::now())
            ->where('confirmed','Y')
            ;

       $weekly_reservation = new Collection();
//        foreach ($reserrvations as $reserrvation){
//            if (Carbon::parse($reserrvation->reservation_date)->weekOfYear == Carbon::now()->weekOfYear)
//                echo $reserrvation->reservation_date;
//                $weekly_reservation->push($reserrvation);
//        }

        if ($reservations->get()->count()%3==0 && $reservations->get()->count()!=0){
//
            $reservations = $reservations->get();
            foreach ($reservations as $reservation){
                $reservation->confirmed='U';
            }
            return ReductionController::assign($user_id, $id, 7);

        }
        return null;
    }

    public  static function bonus2($id, $user_id){
        $reserrvations = DB::table('reservations')->select('reservation_date')
            ->where('user_id',$user_id)
            ->where('reservation_date','>=',Carbon::now()->subDays(30))
            ->where('reservation_date','<=',Carbon::now())
            ->where('confirmed','Y')
            ->orWhere('confirmed','U')
        ;

        $weekly_reservation = new Collection();
//        foreach ($reserrvations as $reserrvation){
//            if (Carbon::parse($reserrvation->reservation_date)->weekOfYear == Carbon::now()->weekOfYear)
//                echo $reserrvation->reservation_date;
//                $weekly_reservation->push($reserrvation);
//        }

        if ($reserrvations->get()->count()%4==0 && $reserrvations->get()->count()!=0){
//
            foreach ($reserrvations->get() as $reserrvation){
                $reserrvation->confirmed='M';
            }
            return ReductionController::assign($user_id, $id, 7);

        }
        return null;
    }
    public function bonus3($id, $user_id){


        $user = User::findOrFail($user_id);
        $orders = Reservation::findOrFail($id)->orders()->get();
        $value=0;
        foreach ($orders as $order){
            $value+=$order->total_price;
        }
        if ($value>=2500){
            return ReductionController::assign($user_id, 3, 14);
        }

    }

    public  static function assign($user_id, $reduction_id, $expiry){

        $user = User::find($user_id);

        if ($user && Reduction::find($reduction_id)){
            $user->reductions()->attach($reduction_id,['expiry_date' => Carbon::now()->addDays($expiry)]);
            return Reduction::find($reduction_id);
        }
        return null;
    }

    public function activateReduction(Request $request){
        $reductions = User::where('api_token',$request->api_token)->first()
            ->reductions()->get();

        foreach ($reductions as $reduction){
            if ($reduction->pivot->id==$request->id){
                if ($reduction->pivot->expity_date>=Carbon::now()){
                    $reduction_type = Reduction::find($reduction->pivot->reduction_id);
                    if ($reduction_type->stackable=='true'){
                        $reduction->pivot->update(['active' => 'true']);
                        return 'reduction has been put as active';
                    }else{
                        if ($reductions->where('active','true'))
                            return 'there is already an active voucher ! try a stackable voucher';
                        else
                            $reduction->pivot->update(['active' => 'true']);
                        return 'reduction has been put as active';
                }


            }
            return 'expired voucher ';
            }
        }
        return 'reduction not found !';
    }
    public function validateReservation(Request $request){
        if ($this->checkRole($request->api_token)){
            $reservation = Reservation::find($request->id);
            if ($reservation){
                $reservation->update(['confirmed'=>'Y']);
                $reservation->save();
                $reduction1 = ReductionController::bonus(2   ,$reservation->user_id);
                $reduction2 = ReductionController::bonus2(1   ,$reservation->user_id);
                $reduction3 = $this->bonus3($reservation->id,$reservation->user_id);


                if ($reduction1 || $reduction2 || $reduction3){
                    echo("congrats you won voucher\n");
                    $data = array();
                    array_push($data,$reduction1, $reduction2, $reduction3);
                    Mail::send(
                        ( new coupon(
                            User::where('api_token',$request->api_token)
                                ->first()->email,
                            User::where('api_token',$request->api_token)
                                ->first()->username,
                            Reduction::find(2)->type,
                            Reduction::find(2)->value

                        )));
                    return $data;


            }
            return $reservation;

//
//            if ($reduction){
//
//                echo  "congrats you won voucher".Reduction::find(2);
//
//            }

        }
        return response()->json('reservation not found',400);
    }}
    public function update(Request $request,$id){

        if (Reduction::find($id)){
            if ($request->input('type'=='percentage'))
                if ($request->input('value')>25)
                    return 'impossible to set a value more than 25%';
            $var = Reduction::find($id);


            if ($request->value != ""){
                $this->validate($request,['duration' => new unsigned()]);
                $var->update(['value'=>$request->value]);
            }
            if ($request->type != "")
                $var->update(['type'=>$request->type]);
            if ($request->stackable != "")
                $var->update(['stackable'=>$request->stackable]);



            if (Input::hasFile('reductionPicture')){
                $pic = Input::file('reductionPicture');
                $pic->move('coupons',$pic->getClientOriginalName());

                $photo = Photo::where('imageable_id',$var->id)
                    ->where('imageable_type',"App\Reduction")
                    ->first();
                if (!$photo)
                    $photo = new Photo();
                $photo->imageable_id = $var->id;
                $photo->path = "http://lumen.test/coupons/".$pic->getClientOriginalName();
                $photo->imageable_type = "App\Reduction";
                $photo->save();
            }

            return response()->json($var);
        }
        return 'reduction doesn\'t exist';
    }

    public function view(Request $request){

            $user = User::where('api_token',$request->api_token)->first();
            $reductions = $user->reductions()->get();
            if ($reductions){

                $validCoupon = new Collection();
                foreach ($reductions as $reduction){


                    if (Carbon::parse($reduction->pivot->expiry_date)
                    ->gte(Carbon::now())){



                        $temp =(array) json_decode($reduction);
                        $data = array();
                        array_push($data,$temp);
                        if(Reduction::find($reduction->id)->photos()->first()){

                            array_push($data,['image_path'
                            =>Reduction::find($reduction->id)->photos()->first()->path]);

                        }



                        $validCoupon->push($data);
                    }

                }
                return $validCoupon;
            }

            return response()->json($reductions);

        return 'reduction not found';
    }
    public function retrieve(Request $request, $id){

        if ($this->checkRole($request->input('api_token'))){


            $user = User::find($id);
            $reductions = $user->reductions()->get();
            if ($reductions){

                $validCoupon = new Collection();
                foreach ($reductions as $reduction){


                    if (Carbon::parse($reduction->pivot->expiry_date)
                        ->gte(Carbon::now())){



                        $temp =(array) json_decode($reduction);
                        $data = array();
                        array_push($data,$temp);
                        if(Reduction::find($reduction->id)->photos()->first()){

                            array_push($data,['image_path'
                            =>Reduction::find($reduction->id)->photos()->first()->path]);

                        }



                        $validCoupon->push($data);
                    }

                }
                return $validCoupon;

            }


            return 'reduction not found';
        }
        return "you can not perform this action.\nMust be supervisor.";
    }

    public function index(){
        $reductions = Reduction::all();
        $proms = new Collection();

        foreach ($reductions as $reduction){
            $data = array();


            $temp =(array) json_decode($reduction);
            array_push($data,$temp);


            if(Reduction::find($reduction->id)->photos()->first()){

                array_push($data,['image_path'
                =>Reduction::find($reduction->id)->photos()->first()->path]);
            }
            $proms->push($data);

        }
        return $proms;
    }



    public function delete($id){

        if ($id!=2){
            $var = Reduction::find($id);
            if ($var){
                $var->delete();
                return response()->json("removed successfully !");

            }
            return 'reduction not found ';

        }
        return 'this reduction can\'t be deleted ';

    }
}
