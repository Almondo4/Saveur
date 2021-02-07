<?php

namespace App\Http\Controllers;
use App\Cart;
use App\Mail\registration;
use App\Photo;
use App\Product;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use App\Subscriber;

class UserController extends Controller
{

    public function identify($api_token){
        $user = User::where('api_token',$api_token)->first();
        if ($user)
        return $user->role_id;
        else
            return null;
    }
    public function create(Request $request){


        if (User::where('username',$request->username)->first()){
            $error = ['error' => 'username already used !'];
            return response()->json('username already used !', 200);
        }elseif (User::where('email',$request->email)->first()){
            $error = ['error' => 'email already used !'];
            return response()->json('email already used !', 400);
        }

            else{

                $this->validate($request,[
                   'email'=>'required | email',
                    'username'=>'required | MIN:4',
                    'password'=>'required | MIN:5'
                ]);
                $request['api_token']= null;
                $cart = new Cart();
                $cart->total_price =0;
                $cart->save();
                $hash = Crypt::encrypt($request->password);
                $user = User::create($request->all()+ ['cart_id' => $cart->id]);
                $user->password = $hash;




                $user->save();

                if (Input::hasFile('userPicture')){
                    $pic = Input::file('userPicture');
                    $pic->move('uploads',$pic->getClientOriginalName());

                    $photo = new Photo();
                    $photo->imageable_id = $user->id;
                    $photo->path = "http://lumen.test/users/".$pic->getClientOriginalName();
                    $photo->imageable_type = "App\User";
                    $photo->save();


                }


                Mail::send(
                    ( new registration(
                        $request->email,
                        $request->username
                    )));
                return response()->json($user);
            }

    }

    public function update(Request $request){

        $useranme=$request->input('username');
        $email=$request->input('email');
        $user = User::where('api_token',$request->api_token)->first();
        if ($useranme){
            if (User::where('username',$useranme)->count()>0)
                return response()->json('username already used !');
            }elseif ($email)
                if (User::where('email',$email)->count()>0)
                    return response()->json('email already used !');
        {
            //$user->update($request->all());
            if ($request->username != "")
                $user->username=$request->username;
            if ($request->email != "")
                $user->email=$request->email;
            if ($request->password != "")
                $user->password=$request->password;
            if ($request->name != "")
                $user->name=$request->name;
            if ($request->password!=''){
                $user->password = Crypt::encrypt($request->password);
            }
            $user->save();

            if (Input::hasFile('userPicture')){
                $pic = Input::file('userPicture');
                $pic->move('users',$pic->getClientOriginalName());

                $photo = Photo::where('imageable_id',$user->id)
                    ->where('imageable_type',"App\User")
                    ->first();
                if (!$photo)
                    $photo = new Photo();
                $photo->imageable_id = $user->id;
                $photo->path = "http://lumen.test/users/".$pic->getClientOriginalName();
                $photo->imageable_type = "App\User";
                $photo->save();
        }
            return response()->json(User::where('api_token',$request->api_token)->first());
    }}

    public function search($username){
        $users = User::where('username','like','%'.$username.'%')
            ->orWhere('name','like','%'.$username.'%')->get();
        $clients=new Collection();

        foreach ($users as $user){
//            $temp = (array)json_decode($user);
//            if(User::find($user->id)->photos()->first())
//            array_push($temp,['image_path'
//                            =>User::find($user->id)->photos()->first()->path]);
//            $json =($temp);
//            $clients->push($json);

            $temp =(array) json_decode($user);
            $data = array();
            array_push($data,$temp);

                if(User::find($user->id)->photos()->first()){

                    array_push($data,['image_path'
                    =>User::find($user->id)->photos()->first()->path]);

                }
            $clients->push($data);


        }
        return $clients;
    }
    public function view($id,Request $request){
        if ($this->identify($request->api_token)==1){
            $var = User::find($id);
            $data = $var;

            if ($var){
                if(User::find($var->id)->photos()->first()){
                    $temp =(array) json_decode($var);
                    $data = array();
                    array_push($data,['image_path'
                    =>User::find($var->id)->photos()->first()->path]);
                    array_push($data,$temp);
                    $var =json_encode($data);
                }

            }else
                return 'user doesn\'t exist';



            return response()->json($data);
        }
        return "unautorized";
    }

    public function me(){
        $var = Auth::user();
        $data = array();
        $temp =(array) json_decode($var);
        array_push($data,$temp);

        if ($var){
            if(User::find($var->id)->photos()->first()){

                array_push($data,['image_path'
                =>User::find($var->id)->photos()->first()->path]);
                $var =json_encode($data);
            }else
                array_push($data,null);


        }else
            return 'user doesn\'t exist';



        return response()->json($data);
    }

    public function index(Request $request){
            $users = User::all();
            $clients = new Collection();

        foreach ($users as $user){
//            $temp = (array)json_decode($user);
//            if(User::find($user->id)->photos()->first())
//                array_push($temp,['image_path'
//                =>User::find($user->id)->photos()->first()->path]);
//            $json =($temp);
//            $clients->push($json);

            $data = array();
            $temp =(array) json_decode($user);
            array_push($data,$temp);


            if(User::find($user->id)->photos()->first()){

                array_push($data,['image_path'
                =>User::find($user->id)->photos()->first()->path]);
            }
            $clients->push($data);

        }
            return response()->json($clients);

    }

    public function delete($id,Request $request){

        $var = User::find($id);
        if ($var){
            if ((Auth::user()->id==$id )|| $this->identify($request->api_token)==1){
                $var = User::find($id);
                $var->delete();
                return response()->json("removed successfully !");
            }else
                return 'you are not allowed to do this action';
        }
            return 'users doesn\'t exist';

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function login(Request $request){
        $user = User::where('username',$request->username)->first();
        if($user){
        if($request->password==Crypt::decrypt($user->password)){
            $request['api_token'] = str_random(60);
            $user->update(['api_token'=>$request->api_token]);
            $user->save();
        }
        else
            return response()->json("invalid username/password !");

            return response()->json($user);
        }
        return response()->json("user doesn't exit !");

    }
    public function logout(Request $request){
        $user = User::where('api_token',$request->api_token)->first();
        if(!$user)
            return "user not found !";
        else{
            $user->update(['api_token'=>null]);
           // return response()->json($user);
            return redirect('/login');
        }

    }
    public function pics($id){
        return Product::find($id)->photos()->get();
    }

    public function subscribe(Request $request){
        $subscriber = Subscriber::create($request->all());
        Mail::send(
            new registration(
                $request->email,
                ""
            )
        );
        return $subscriber;
    }
}
