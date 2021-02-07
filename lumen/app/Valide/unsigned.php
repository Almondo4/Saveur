<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 6/17/2018
 * Time: 2:29 PM
 */

namespace App\Valide;


use Illuminate\Contracts\Validation\Rule;

class unsigned implements Rule
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
        return $value>=0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        // return ": the field must cantain at least 6 characters";
        return "the field must a positive number";
    }
}
