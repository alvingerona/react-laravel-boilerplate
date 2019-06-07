<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Presenters\CommentPresenter;

class CommentStore extends Notification
{
    use Queueable;

    private $comment;    

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($comment)
    {
        $this->comment = $comment;
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
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $postedBy = $this->comment->postedBy;
        return (new MailMessage)
            ->subject('New Comment Posted')
            ->line('New comment has been posted by ' . $postedBy->getName() . ' at ' . $this->comment->ticket->getKey())
            ->action('View Ticket', url('/tickets/browse/' . $this->comment->ticket_id ));
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
            "commentData" => $this->formatComment($this->comment)
        ];
    }    

    private function formatComment($comment)
    {
        if(!$comment)
        {
            return null;
        }

        $presenter = new CommentPresenter;

        return $presenter->present($comment);        
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
}
