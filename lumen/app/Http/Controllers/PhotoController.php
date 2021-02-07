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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\View\View;

class PhotoController extends Controller
{
    public function __construct(Request $request)
    {
        if($request->imageable_type == 'App\Product'){
            $this->middleware('admin',['except'=>['index','view','show']]);

        }
    }

    public function create(Request $request){
        $var = Photo::create($request->all());
        return response()->json($var);
    }

    public function update(Request $request,$id){
        $var = Photo::find($id);
        if ($var){
            $var->update($request->all());
            return response()->json($var);
        }
        return 'image doesn\'t exist';
    }

    public function show($id, Request $request){
//        $image = Photo::where('imageable_type',$request->imageable_type)
//                        ->where('imageable_id',$id)
//                        ->first();
//        echo $image->path;

        if (Input::hasFile('plat')){
            $pic = Input::file('plat');
            $pic->move('uploads'.$pic->getClientOriginalName());

        }

        $image = 'http://lumen.test/uploads/'.$pic->getClientOriginalName();
        echo $image;
        return View('picTEST',compact('image'));

      //  return response()->json($var);
    }

    public function index(Request $request){
        $var = Photo::where('imageable_type',$request->imageable_type)->get();
        return response()->json($var);
    }

    public function delete($id){
        $var = Photo::find($id);
        $var->delete();
        return response()->json("removed successfully !");

    }
}