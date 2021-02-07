<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 6/15/2018
 * Time: 11:14 AM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable =[
        'id','total_price'
    ];
    protected $hidden =[
        'created_at','updated_at'
    ];

    public function user(){
        return $this->hasOne('App\User');
    }
    public function products(){
        return $this->belongsToMany('App\Product')
            ->withPivot('id');
    }

}