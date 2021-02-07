<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 6/6/2018
 * Time: 2:12 PM
 */

namespace App;


use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class Valid implements Rule
{

    /**
     * Determine if the validation rule passes.
     *
     * @param  string $attribute
     * @param  mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //return (strlen($value)>5);
        return Carbon::now()->lte(Carbon::parse($value));
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
       // return ": the field must cantain at least 6 characters";
        return "the field must not contain a past date";
    }
}