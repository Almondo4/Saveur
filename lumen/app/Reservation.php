<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 2/27/2018
 * Time: 1:22 PM
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'id','user_id','reservation_date','reservation_time',
        'duration','position','confirmed'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    public function tables(){
        return $this->belongsTo('App\Table','position','position');
    }
    public function users(){
        return $this->belongsTo('App\User');
    }
    public function orders(){
        return$this->hasMany('App\Order');
    }

}