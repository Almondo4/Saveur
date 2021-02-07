<?php

namespace App\Http\Middleware;

use App\ExceptionPeriod;
use App\Schedule;
use Closure;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class ScheduleMiddleware
{
    public function inException($date)
    {
        $exceptions = ExceptionPeriod::all();
        $activeExceptions = new Collection();
        foreach ($exceptions as $exception) {
            $activeException = Carbon::parse($exception->exception_date);
            if ($activeException->addDays($exception->duration)->gte(Carbon::now()))
                $activeExceptions->push($activeException);

            foreach ($activeExceptions as $activeException) {
                if (Carbon::parse($date)->lte(Carbon::parse($exception->exception_date)->addDays($exception->duration))
                    && Carbon::parse($date)->gte(Carbon::parse($exception->exception_date)))
                    return $activeException;
                else
                    return null;
            }

        }
        //  }
        // $exceptions = ExceptionPeriod::where('exception_date','>=',Carbon::now()->subDays($exceptions->duration))->get();
//        foreach ($exceptions as $exception){
//            if ($date->lte(Carbon::parse($exception->exception_date)->addDays($exception->duration)) && $date->gte(Carbon::parse($exception->exception_date)))
//                return $exception;
//            else
//                return null;
//        }
    }


    public function handle($request, Closure $next)
    {
        $weekMap = [
            'sunday' => 0,
            'monday' => 1,
            'tuesday' => 2,
            'wednesday' => 3,
            'thursday' => 4,
            'friday' => 5,
            'saturday' => 6,
        ];
        $schedule = Schedule::find(1);
        $date_index = Carbon::parse($request->reservation_date)->dayOfWeek;
        $time = Carbon::parse($request->reservation_time);
        $date = Carbon::parse($request->reservation_date);
        if ($this->inException($date)) {
            return response("please, try again \n we are not opening in the following periods \n" . ExceptionPeriod::all('exception_date', 'duration'));
        } else
//            ($date_index >= $weekMap[$schedule->opening_day]
//            && ($date_index <= $weekMap[$schedule->closing_day])
//            && ($time->gte(Carbon::parse($schedule->opening_time)))
//            && $time->lte(Carbon::parse($schedule->closing_time)))
        {
            return $next($request);

        }
        return response("Schedule error !\nwe work from :" . $schedule->opening_time . " to " . $schedule->closing_time . "\t every day exccept the weekends", 401);
    }
}
