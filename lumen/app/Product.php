<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 10:41 AM
 */


namespace App;


use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'id','name','price','available','inMenu','description'
        ,'ingredients','category'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    public function orders(){
        return $this->belongsToMany('App\Order');
    }
    public function photos(){
        return $this->morphMany('App\Photo','imageable');
    }
    public function carts(){
        return $this->belongsToMany('App\Cart')
            ->withPivot('id');
    }

}