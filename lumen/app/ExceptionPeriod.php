<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 4/25/2018
 * Time: 1:52 PM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
class ExceptionPeriod extends Model
{
    protected $fillable = [
        'id','exception_date','duration','schedule_id'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];


    public function schedule(){
        return $this->belongsToMany('App\Schedule');
    }

}