<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 3/15/2018
 * Time: 10:41 AM
 */


namespace App;


use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable = [
        'id','description','discount','starting','ending','gift'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];

    public function photos(){
        return $this->morphMany('App\Photo','imageable');
    }

}