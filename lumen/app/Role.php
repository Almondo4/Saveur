<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 10:44 AM
 */


namespace App;


use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    protected $fillable = [
        'id','name'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];

    public function users(){
        return $this->hasMany('App\User');
    }

}