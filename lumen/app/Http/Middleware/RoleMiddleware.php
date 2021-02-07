<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{

    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if ($user->role_id==1){
                return $next($request);

    }
        return response('Unauthorized.', 401);
    }
}
