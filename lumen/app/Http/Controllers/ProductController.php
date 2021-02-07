<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 3:54 PM
 */

namespace App\Http\Controllers;


use App\Photo;
use App\Product;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;


class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin',['only'=>['createEdit', 'create', 'update','delete']]);
    }

    public function createEdit(Request $request){
        if ($request->input('id')!="")
            return $this->update($request,$request->id);
        else
            return $this->create($request);
    }

    public function create(Request $request){
        $var = new Product();
        if ($request->name != "")
            $var->update(['name'=>$request->name]);
        if ($request->price != "")
            $var->update(['price'=>$request->price]);
        if ($request->available != "")
            $var->update(['available'=>$request->available]);
        if ($request->inMenu != "")
            $var->update(['inMenu'=>$request->inMenu]);
        if ($request->description != "")
            $var->update(['description'=>$request->description]);
        if ($request->ingredients != "")
            $var->update(['ingredients'=>$request->ingredients]);
        if ($request->category != "")
            $var->update(['category'=>$request->category]);

        $var->save();

        if (Input::hasFile('productPicture')){

            $pic = Input::file('productPicture');
            $pic->move('dishes',$pic->getClientOriginalName());

            $photo = new Photo();
            $photo->imageable_id = $var->id;
            $photo->path = "http://lumen.test/dishes/".$pic->getClientOriginalName();
            $photo->imageable_type = "App\Product";
            $photo->save();


        }
        return response()->json($var);
    }

    public function update(Request $request, $id){

        $var = Product::find($id);


        if ($var){
            if ($request->name != "")
                $var->update(['name'=>$request->name]);
            if ($request->price != "")
                $var->update(['price'=>$request->price]);
            if ($request->available != "")
                $var->update(['available'=>$request->available]);
            if ($request->inMenu != "")
                $var->update(['inMenu'=>$request->inMenu]);
            if ($request->description != "")
                $var->update(['description'=>$request->description]);
            if ($request->ingredients != "")
                $var->update(['ingredients'=>$request->ingredients]);
            if ($request->category != "")
                $var->update(['category'=>$request->category]);

        $var->save();

        if (Input::hasFile('productPicture')){
            $pic = Input::file('productPicture');
            $pic->move('dishes',$pic->getClientOriginalName());

            $photo = Photo::where('imageable_id',$var->id)
                ->where('imageable_type',"App\Product")
                ->first();
            if (!$photo)
                $photo = new Photo();
            $photo->imageable_id = $var->id;
            $photo->path = "http://lumen.test/dishes/".$pic->getClientOriginalName();
            $photo->imageable_type = "App\Product";
            $photo->save();
        }
        return response()->json($var);
    }}

    public function view($id){
        $var = Product::find($id);
        return response()->json($var);
    }

    public function index(){
        $var = Product::all();
        return response()->json($var);
    }

    public function delete($id){
        $var = Product::find($id);
        $var->delete();

        return response()->json("removed successfully !");

    }

    public function getMenu(){
        $products = Product::where('inMenu',1)->get();

        $produits=new Collection();

        foreach ($products as $product){
//            $temp = (array)json_decode($product);
//            if(Product::findOrFail($product->id)->photos()->first())
//                array_push($temp,['image_path'
//                =>Product::findOrFail($product->id)->photos()->first()->path]);
//            $json =($temp);
//            $produits->push($json);
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
    public function newProducts(){
        $products = Product::where('created_at','>=',Carbon::now()->subDays(15))->get();
        return $products;
    }

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

            $produits=new Collection();

            foreach ($top as $item){

                $temp =(array) json_decode($item);
                $data = array();
                array_push($data,$temp);

                if(Product::findorFail($item->id)->photos()->first()){

                    array_push($data,['image_path'
                    =>Product::find($item->id)->photos()->first()->path]);
                }
                $produits->push($data);

            }

            return ($produits);
        }

        return 'there is no hot products at the moment';
    }
    public function available($id, Request $request){

        $product = Product::findOrFail($id);
        if (User::where('api_token',$request->api_token)->first()
            ->role_id==3){
            $product->available = $request->available;
            $product->save();
        }
        return $product;
    }

    public function pics($id){
        return Product::find($id)->photos()->get();
    }
}