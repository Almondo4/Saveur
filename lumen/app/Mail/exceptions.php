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

class exceptions extends Mailable
{


    use Queueable, SerializesModels;

    /** @var string the address to send the email */
    protected $to_address;
    protected $name;
    protected $start;
    protected $end;



    public function __construct($to_address, $name,  $start, $end)
    {
        $this->start = $start;
        $this->to_address = $to_address;
        $this->name = $name;
        $this->end = $end;

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
            ->subject('Exception period')
            ->view('emails.exception')
            ->with([
                'name'=>$this->name,
                'start'=>$this->start,
                'end'=>$this->end,
            ]);
    }

}