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

class reservation extends Mailable
{


    use Queueable, SerializesModels;

    /** @var string the address to send the email */
    protected $to_address;

    protected $name;
    protected $date;




    public function __construct($to_address, $name, $date)
    {
        $this->to_address = $to_address;
        $this->name = $name;
        $this->date = $date;

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
            ->subject('Your reseration ')
            ->view('emails.reservation')
            ->with(['name'=>$this->name,
                    'date'=>$this->date
                ])
            ;
    }

}