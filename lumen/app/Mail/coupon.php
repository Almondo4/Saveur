<?php
/**
 * Created by PhpStorm.
 * User: MSI
 * Date: 5/25/2018
 * Time: 6:20 PM
 */

namespace App\Mail;


use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class coupon extends Mailable
{


    use Queueable, SerializesModels;

    /** @var string the address to send the email */
    protected $to_address;
    protected $type;
    protected $name;
    protected $value;



    public function __construct($to_address, $name,  $type, $value)
    {
        $this->type = $type;
        $this->to_address = $to_address;
        $this->name = $name;
        $this->value = $value;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->to($this->to_address)
            ->subject('your winning')
            ->view('emails.coupon')
            ->with([
                'name'=>$this->name,
                'type'=>$this->type,
                'value'=>$this->value,
            ]);
    }

}