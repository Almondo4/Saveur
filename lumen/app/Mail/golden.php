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

class golden extends Mailable
{


    use Queueable, SerializesModels;

    /** @var string the address to send the email */
    protected $to_address;
    protected $reason;
    protected $name;




    public function __construct($to_address, $reason)
    {
        $this->to_address = $to_address;
        $this->reason = $reason;

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
            ->subject('Golden')
            ->view('emails.design.test')
            ->with([
                'reason'=>$this->reason
            ]);
    }

}