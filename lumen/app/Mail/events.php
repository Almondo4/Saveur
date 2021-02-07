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

class events extends Mailable
{


    use Queueable, SerializesModels;

    /** @var string the address to send the email */
    protected $to_address;
    protected $date;
    protected $name;
    protected $description;



    public function __construct($to_address, $name,  $date, $description)
    {
        $this->date = $date;
        $this->to_address = $to_address;
        $this->name = $name;
        $this->description = $description;

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
            ->subject($this->description)
            ->view('emails.event')
            ->with([
                'name'=>$this->name,
                'date'=>$this->date,
            ]);
    }

}