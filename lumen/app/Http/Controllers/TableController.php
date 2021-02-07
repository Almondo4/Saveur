<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Table;

class TableController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin',['except'=>['view']]);
    }
    // version betadb
//    public function checkRole($id){
//        $roles = User::find($id)->roles()->get();
//
//        foreach ($roles as $role){
//            if (($role->pivot->role_id=="1")||($role->pivot->role_id=="3"))
//                return true;
//        }
//    }

//    public  function checkRole($token){
//        $user = User::where('api_token',$token);
//        return ($user->first()->role_id == 2);
//    }
    public function createEdit(Request $request){
        if (Table::where('position',$request->input('position'))->first())
            return $this->update($request,$request->position);
        else
            return $this->create($request);

    }

    public function create(Request $request){
        if ($request->input('position')>20)
            return 'error position '.$request->position." not allowed";
        else{
            $table = Table::create($request->all());
            return response()->json($table);
        }

    }

    public function update(Request $request,$position){
        $var = Table::where('position',$position)->first();
        if ($var){
                $var->update($request->all());
                $var->save();
                return response()->json($var);
        }
        return 'table not found';
    }

    public function view($id){
        $var = Table::find($id);
        return response()->json($var);
    }

    public function index(){
        $var = Table::all();
        return response()->json($var);
    }

    public function delete($position){
            $var = Table::where('position',$position)->first();
            if ($var){
                $var->delete();
                return response()->json("removed successfully !");
            }
        return "table is free !";

    }

//    public  function createpost(Request $request){
//
//
//        //$this->validateRequest($request);
//        $table = new Table;         //create record
//        //$table = Table::find(1);  //update record
//        $table->id = $request->get('id');
//        $table->nbPlaces =$request->get('nbPlaces');
//        $table->Admins_idAdmin =$request->get('Admins_idAdmin');
//        $table->save();
//        if($table)
//           return ("The table with id {$table->id} has been created");
//
//
//    }
//
//    public function update(request $request){
//
//            //$table = new Table;         //create record
//            $table = Table::find($request->id);  //update record
//            $table->nbPlaces=$request->nbPlaces;
//            $table->Admins_idAdmin=$request->Admins_idadmin;
//            $table->save();
//            if($table)
//                return "sccessfully updated";
//
//    }
//
//    public function check($id){
//        $state =Table::find($id)->etat;
//        if ($state==1)
//            return "table #".$id." is already reserved ";
//        if ($state==0)
//            return "table #".$id." is free";
//    }
//
//
//    public function book($id, Request $request){
//        if(Table::find($id)->state==0){
//            $table = Table::create($request->all());
//            $table::where('id',$id)->update(['etat'=>1]);
//            $table->save();
//        }else
//            return "table #".$id."is already booked !";
//
//
//    }
//    public function cancel($id){
//        Table::where('id',$id)->update(['etat'=>0]);
//        $state = Table::find($id)->etat;
//        if($state==0)
//            return "the reservation of table #".$id." has been successfuly cancelled";
//
//    }
}
