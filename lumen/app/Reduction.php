<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reduction extends Model
{

    protected $fillable = [
        'id','value','type','stackable'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];

    public function users(){
        return $this->belongsToMany('App\User')
            ->withPivot('id');
    }

    public function photos(){
        return $this->morphMany('App\Photo','imageable');
    }
}

