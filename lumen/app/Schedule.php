<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 10:40 AM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{

    protected $fillable = [
        'id','opening_day','closing_day','opening_time','closing_time','exception','exception_duration'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];


    public function exceptions(){
        return $this->hasMany('App\ExceptionPeriod');
    }
}