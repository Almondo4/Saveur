<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','username','email','name', 'api_token','role_id','cart_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password','created_at','updated_at'
    ];
    protected $guarded = [
        'password'
    ];


    public function roles(){
        return $this->belongsToMany('App\Role');
    }

    public function reductions(){
        return $this->belongsToMany('App\Reduction')
            ->withPivot('expiry_date','id');
    }
    public function reservations(){
        return $this->hasMany('App\Reservation');
    }
    public function photos(){
        return $this->morphMany('App\Photo','imageable');
    }
    public function cart(){
        return $this->belongsTo('App\Cart');
    }

    public function isHe($roleName)
    {
        foreach ($this->roles()->get() as $role)
        {
            if ($role->name == $roleName)
            {
                return true;
            }
        }

        return false;
    }
}
