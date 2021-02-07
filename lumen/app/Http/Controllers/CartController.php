<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 6/15/2018
 * Time: 3:25 PM
 */

namespace App\Http\Controllers;


use App\Cart;
use App\Order;
use App\Product;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function verifyOwner(){

    }
    public function addToCart(Request $request){     //todo to be secured
        $product = Product::Find($request->product_id);
        $user = User::where('api_token', $request->api_token)->first();

        if ($product && $user){
            $cart = $user->cart()->first();
                $cart->products()->attach($request->product_id);
                $value = $cart->total_price+$product->price;
                $cart->update(['total_price'=> $value]);
                $cart->save();
                echo '\n total price :'.$cart->total_price."\n";
                return response()->json($cart->products()->get());



        }

        return response()->json("order or product couldn't be found  !");
    }


    public function removeFromCart($id, Request $request){
        $product =Product::findorfail($id);
        $user = Auth::user();
        $cart = $user->cart()->first();
        $cart->products()->detach($product->id);
        $value = $cart->total_price - $product->price;
        $cart->update(['total_price'=> $value]);
        $cart->save();
        echo '\n total price :'.$cart->total_price."\n";
        return response()->json($cart->products()->get());


    }

    public function clearCart(){
        $user = Auth::user();
        $cart = $user->cart()->first();
        $products = $cart->products()->get();
        foreach ($products as $product){
            $product->delte();
        }
        $cart->update(['total_price'=>0]);
        $cart->save();


    }


    public function submit($reservation_id){
        $user = Auth::user();
        $cart = $user->cart()->first();
        $order = new Order();
        $order->total_price = $cart->total_price;
        $order->reservation_id =$reservation_id;
        $order->save();

        $products = $cart->products()->get();

        foreach ($products as $product){
            $order->products()->attach($product->id);
        }
        return $order->products()->get();


    }

    public function view(){
        $user = Auth::user();
        $products = $user->cart()->first()->products()->get();
        $produits=new Collection();

        foreach ($products as $product){

            $temp =(array) json_decode($product);
            $data = array();
            array_push($data,$temp);

            if(Product::findorFail($product->id)->photos()->first()){

                array_push($data,['image_path'
                =>Product::find($product->id)->photos()->first()->path]);
            }
            $produits->push($data);

        }
        return response()->json($produits);

    }

}