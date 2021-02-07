<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 10:41 AM
 */


namespace App;


use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'id','total_price','reservation_id','applied_coupon',
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    public function products(){
        return $this->belongsToMany('App\Product')
            ->withPivot('id');
    }
    public  function users(){
        return $this->belongsTo('App\User');
    }
    public function reservations(){
        return $this->belongsTo('App\Reservation');
    }

}