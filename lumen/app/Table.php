<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 2/27/2018
 * Time: 1:14 PM
 */

namespace App ;

use Illuminate\Database\Eloquent\Model;
class Table extends Model
{
    protected $fillable = [
        'id', 'nbPlaces','users_id','position'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    public function reservations(){
        return $this->hasMany('App\Reservation','position','position');
    }
}

use Illuminate\Auth\EloquentUserProvider;
