<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 3:53 PM
 */

namespace App\Http\Controllers;


use App\Event;
use App\Order;
use App\Product;
use App\Reduction;
use App\Reservation;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public  function checkRole($token){
        $user = User::where('api_token',$token);
        return ($user->first()->role_id == 1);
    }

    public function create(Request $request){           // todo do not allow unauthorized people to create an order for others.
        $var = Order::create($request->all());
        return response()->json($var,201);
    }

    public function update(Request $request,$id){
        $var = Order::find($id);
        $var->update($request->all());
        return response()->json($var);
    }

    public function view(Request $request){
        $user = User::where('api_token',$request->api_token)->first()->id;
        $reservations = Reservation::where('user_id',$user)->get();
        $orders = new Collection();
        foreach ($reservations as $reservation)
            if ($reservation->orders()->first())
            $orders->push($reservation->orders()->get());
        return response()->json($orders);
    }

    public function index(){
        $var = Order::all();
        return response()->json($var, 200);
    }

    public function applyCoupon(Request $request){
        $reservation = Reservation::findOrFail($request->reservation_id);
        if ($reservation)
        $orders = Order::where('reservation_id',$reservation->id)->get();
        //$order = Order::findOrFail($request->id_order);
        //$coupon = Reduction::findOrfail($request->id_coupon);
        $couponX = null;
        $coupons = User::findOrFail($reservation->user_id)->reductions()->get();
        foreach ($coupons as $coup){
            if ($coup->pivot->id==$request->couponX)
                $couponX = $coup;

        }
        if ($couponX){
            if ($couponX->stackable=='true' || $orders->first()->applied_coupon==0)
            {
            foreach ($orders as $order){


                if ($order){

                        $total = $order->total_price;
                        if ($couponX->type=='percentage')
                            $total=$total-$total*($couponX->value/100);
                        elseif ($couponX->type=='discount'){
                            if ($total<=$couponX->value)
                                $total=0;
                            else
                                $total=$total-$couponX->value;
                        }

                        $order->total_price = $total;
                        $order->applied_coupon=$order->applied_coupon+1;
                        $order->save();


                }else
                return 'order not found';
            }
                $couponX->pivot->delete();
                return response()->json('coupon as been applied');

            }
            return 'coupon cannot be applied. please try a non stackable coupon';

        }
        return 'couldn\'t find the coupon in your inventory';
    }

    public function calculatePrice($order_id){
        $total=0;
        $currentOrder = Order::find($order_id);
        $orders = $currentOrder->products()->get();
        foreach ($orders as $order){
            $total=$total+Product::find($order->pivot->product_id)->price;
        }
        $reservation = Reservation::find($currentOrder->reservation_id);
        $user = User::find($reservation->user_id);
        $reductions = $user->reductions()->get();
        foreach ($reductions as $reduction){
            if ($reduction->pivot->active=='true'){
                $redu = Reduction::find($reduction->pivot->reduction_id);
                if ($redu->type=='percentage')
                    $total=$total*($redu->value/100);
                elseif ($redu->type=='discount')
                    $total=$total-$redu->value;
            }

        }
        $discounts = Event::where('starting','<=',Carbon::now())
        ->where('ending','>=',Carbon::now())->get();
        foreach ($discounts as $discount){

            $total=$total-$total*($discount->discount/100);
        }
        $currentOrder->update(['total_price'=>$total]);
        return $total;
    }

    public function delete($id, Request $request){
        $var = Order::find($id);
        if ($var){
            if ($this->verifyOwner($id, $request->api_token))
            {
                    $var->delete();
                    return response()->json("removed successfully !");
                }
            return "you are not allowed to do this action";

        }
        return "ordere doesn't exist !";
//
    }

        public function verifyOwner($id, $api_token){
             $user= Auth::user();
            $order = Order::find($id);
//            echo $order->reservation_id;
//            echo (Reservation::select('id')->where('id', $order->reservation_id)->first()->id) ;
            $ids = new Collection();
            foreach ( Reservation::select('id')->where('user_id',$user->id)->get() as $reservaion){
               $ids->push($reservaion->id);
           }
//            echo $ids;
//            dd($ids->contains($order->reservation_id));
                    if ($ids->contains($order->reservation_id)|| $this->checkRole($api_token))
                        return true;
                    else
                        return false;
        }

        public function addToOrder($id_product,Request $request){     //todo to be secured
            $order = Order::find($request->id_order);
            $product = Product::Find($id_product);
            if ($order && $product){
                if ($this->verifyOwner($request->id_order,$request->api_token)){
                    $order->products()->attach($id_product);
                    $order->update(['total_price'=>$this->calculatePrice($request->id_order)]);
                    echo 'total price :'.$order->total_price."\n";
                    return response()->json($order->products()->get());

                }
                else
                    return "you are not allowed to do this action";

            } elseif (!$order && $product)
                return "order couldn't be found";
            elseif (!$product && $order)
                return "product couldn't be found";

            return "order and product couldn't be found  !";
        }

        public function removeFromOrder(Request $request,$pivot_id){   //todo to be secured!
            $order = Order::find($request->id);
            $products = $order->products()->get();
            foreach ($products as $product){
                if ($product->pivot->id==$pivot_id){
                    $product->pivot->delete();
                    echo $product.'has been removed \n';
                }

            }
        }

//        public function validate(){
//
//        }
}