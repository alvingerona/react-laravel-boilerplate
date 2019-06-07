<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\UserTicketScope;
use App\Models\Relations\UserTicketRelation;
use App\Models\Attributors\UserTicketAttributor;

class UserTicket extends Model
{
    use UserTicketScope, UserTicketRelation, UserTicketAttributor;

    protected $table = 'user_tickets';

    protected $fillable = [
        'user_id',
        'ticket_id'
    ];

    public static function assign($userId, $ticketId)
    {
        /**
         * First make sure there is no one assigned
         */
        self::where('ticket_id', $ticketId)->delete();

        self::create([
            'user_id' => $userId,
            'ticket_id' => $ticketId
        ]);
    }
}