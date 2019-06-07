<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Presenters\TicketPresenter;

class TicketStatusChange extends Notification
{
    use Queueable;

    private $ticket;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ticket)
    {
        $this->ticket = $ticket;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the database representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return Array
     */    
    public function toDatabase($notifiable)
    {
        return [
            "ticketData" => $this->formatTicket($this->ticket)
        ];
    }    

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $data = $this->formatTicket($this->ticket);
        $url = url('/tickets/browse/' . $this->ticket->id);

        return (new MailMessage)
                    ->subject('Ticket Status Change - ' . $data['data']['title'] )
                    ->line('The ticket has been changed to ' . $this->ticket->status->name )
                    ->action('View Ticket ' . $data['data']['title'] , $url);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }

    private function formatTicket($ticket)
    {
        if(!$ticket)
        {
            return null;
        }

        $presenter = new TicketPresenter;

        return $presenter->present($ticket);        
    }         
}
