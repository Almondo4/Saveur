<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 4/28/2018
 * Time: 2:18 PM
 */

namespace App;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable =[
        'id','imageable_id','path','imageable_type'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];

    public  function imageable(){
        return $this->morphTo();
    }

}