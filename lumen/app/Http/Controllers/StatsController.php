<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 6/17/2018
 * Time: 9:53 PM
 */

namespace App\Http\Controllers;


use App\Order;
use App\Reservation;
use App\Schedule;
use Carbon\Carbon;

class StatsController   extends Controller
{
    public function hotProducts(){
        $products = DB::table('order_product')->select('product_id', DB::raw('count(*) as number_of_orders, product_id'))
            ->groupBy('product_id')
            ->get();

        if ($products->first()){
            $top=new Collection();

            for ($i=0;$i<3;$i++){
                if ($products->first()){
                    $occurrence = $products->max('number_of_orders');

                    $top->push(Product::findorFail($products->
                    where('number_of_orders',$occurrence)->
                    first()->product_id
                    ));



                    $found = false;
                    foreach($products as $key => $value) {
                        if ($value->number_of_orders == $occurrence) {
                            $found = true;
                            break;
                        }
                    }

                    if ($found) unset($products[$key]);

                }



            }
            return ($top);
        }

        return 'there is no hot products at the moment';
    }

    public function average_price(){


        $week1 = Reservation::where('reservation_date','>=',Carbon::now()->subDays(7))
            ->get();
        $week2 = Reservation::where('reservation_date','>=',Carbon::now()->subDays(14))
            ->where('reservation_date','<=',Carbon::now()->subDays(7))
            ->get();
        $week3 = Reservation::where('reservation_date','>=',Carbon::now()->subDays(21))
            ->where('reservation_date','<=',Carbon::now()->subDays(14))
            ->get();
        $week4 = Reservation::where('reservation_date','>=',Carbon::now()->subDays(28))
            ->where('reservation_date','<=',Carbon::now()->subDays(21))
            ->get();
        $month=[$week1,$week2,$week3,$week4];

        $price=0;
        $co=0;
        $i=0;
        $data = array();
        foreach ($month as $week){
            foreach ($week as $reservation){
                $orders = $reservation->orders()->get();
                foreach ($orders as $order){
                    $price+=$order->total_price;
                    $co+=1;
                }
            }
            if ($co==0)
                $total=0;
            else
                $total=$price/$co;
            $data['week'.$i]=$total;
            $i+=1;
            $price=0;
            $co=0;
        }

        return$data;

    }

    public function average_load(){
        $opening = Schedule::first()->opening_time;
        $closing = Schedule::first()->closing_time;

        $work_time = Carbon::parse($closing)->diff(Carbon::parse($opening));

        return $work_time;



    }



}