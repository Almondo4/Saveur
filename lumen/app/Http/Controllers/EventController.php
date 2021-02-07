<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 3:50 PM
 */

namespace App\Http\Controllers;



use App\Event;
use App\Mail\events;
use App\Photo;
use App\Subscriber;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;

class EventController extends Controller
{
    public function __construct(){
        $this->middleware('admin',['except'=>['index','view']]);
    }

    public function createEdit(Request $request){
        $test = false;

        if ($request->input('discount')!="")
            $test =$this->checkDiscount($request);
        if ($test){
            if ($request->input('id')!=null)
                return $this->update($request,$request->id);
            else
                return $this->create($request);

        }
        return 'discount value can\'t be over 25%';
    }

    public function create(Request $request){
        $var = new Event();

        if ($request->description != "")
            $var->description=$request->description;
        if ($request->gift != "")
            $var->gift=$request->gift;
        if ($request->discount != "")
            $var->discount=$request->discount;
        if ($request->starting != "")
            $var->starting=$request->starting;
        if ($request->ending != "")
            $var->ending=$request->ending;

        $var->save();

        $subscribers=Subscriber::all();
        $users = User::all();

        if (Input::hasFile('eventPicture')){
            $pic = Input::file('eventPicture');
            $pic->move('events',$pic->getClientOriginalName());

            $photo = new Photo();
            $photo->imageable_id = $var->id;
            $photo->path = "http://lumen.test/events/".$pic->getClientOriginalName();
            $photo->imageable_type = "App\Event";
            $photo->save();


        }
        foreach ($users as $user){
            Mail::send(
                ( new events(
                    $user->email,
                    $user->name,
                    $var->date,
                    $var->description
                )));
        }
        foreach ($subscribers as $subscriber){
            Mail::send(
                ( new events(
                    $subscriber->email,
                    "Subscriber",
                    $photo->path,
                    $var->description
                )));
//        }

        return response()->json($var);
    }
    }

    public function update(Request $request,$id){
        $var = Event::find($id);
        if ($var){
            if ($request->description != "")
                $var->description=$request->description;
            if ($request->gift != "")
                $var->gift=$request->gift;
            if ($request->discount != "")
                $var->discount=$request->discount;
            if ($request->starting != "")
                $var->starting=$request->starting;
            if ($request->ending != "")
                $var->ending=$request->ending;

            $var->save();

            if (Input::hasFile('eventPicture')){
                $pic = Input::file('eventPicture');
                $pic->move('users',$pic->getClientOriginalName());

                $photo = Photo::where('imageable_id',$var->id)
                    ->where('imageable_type',"App\Event")
                    ->first();
                if (!$photo)
                    $photo = new Photo();
                $photo->imageable_id = $var->id;
                $photo->path = "http://lumen.test/events/".$pic->getClientOriginalName();
                $photo->imageable_type = "App\Event";
                $photo->save();
            }
            return response()->json($var);
        }
        return 'event not found';
    }

    public function checkDiscount($request){
        $discount =$request->discount;
        if ($discount<=25)
            return true;
        return false;

    }

    public function view($id){
        $var = Event::find($id);
        $temp = (array)json_decode($var);
        if($var->photos()->first())
            array_push($temp,['image_path'
                =>$var->photos()->first()->path]);

        return response()->json($temp);
    }

    public function index(){
        $events = Event::all();
        $eventZ=new Collection();

        foreach ($events as $event){
            $temp =(array) json_decode($event);
            $data = array();
            array_push($data,$temp);
            if(Event::find($event->id)->photos()->first()){

                array_push($data,['image_path'
                =>Event::find($event->id)->photos()->first()->path]);

            }
            $eventZ->push($data);

        }
        return $eventZ;
    }

    public function delete($id){
        $var = Event::find($id);
        if ($var){
            $var->delete();
        }


        return response()->json("removed successfully !");

    }
}