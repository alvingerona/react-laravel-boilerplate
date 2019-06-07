<?php 

namespace App\Services\Ticket;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;

/**
 * Notificaitons
 */
use App\Notifications\TicketStatusChange;
use App\Notifications\TicketUpdate;
use App\Notifications\TicketStore;

/**
 * Models
 */
use App\Models\Ticket;

class TicketStoreUpdateMailer
{
    private $userRepo;

    public function __construct(
        UserRepository $userRepo
    ) {
        $this->userRepo = $userRepo;
    }

    public function sendForStatusChange(Ticket $ticket)
    {
        $this->send($ticket, TicketStatusChange::class);
    }

    public function sendForUpdate(Ticket $ticket)
    {
        $this->send($ticket, TicketUpdate::class);
    }

    public function sendForStore(Ticket $ticket)
    {
        $this->send($ticket, TicketStore::class);
    }

    public function send(Ticket $ticket, $notifyClass)
    {
        $this->userRepo->skipPresenter();
        $currentUser = $this->userRepo->currentUser();
        $users = $this->userRepo->ticketWatchers($ticket->id);

        /**
         * Remove current login from $users
         */
        $users = $users->filter(function($user) use($currentUser){
            return $currentUser->id != $user->id;
        });

        $users->each(function($user) use($notifyClass, $ticket){
            $user->notify(new $notifyClass($ticket));
        });
    }       
}
