<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 3:53 PM
 */

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

use App\Role;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }
    public function create(Request $request){
        $var = Role::create($request->all());
        return response()->json($var);
    }

    public function update(Request $request,$id){
        $var = Role::find($id);
        $var->update($request->all());
        return response()->json($var);
    }

    public function view($id){
        $var = Role::find($id);
        return response()->json($var);
    }

    public function test(){

    }
    public function index(){
        $var = Role::all();
        return response()->json($var);
    }

    public function delete($id){
        $var = Role::find($id);
        $var->delete();
        return response()->json("removed successfully !");

    }
    public function giveRole($id, Request $request){
        $user = User::find($id);
        if ($user){
            $user->role_id = $request->role_id;
            $user->save();
            return response()->json($user);
        }else
            return 'users not found !';
    }
}