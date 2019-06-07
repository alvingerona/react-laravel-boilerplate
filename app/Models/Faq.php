<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\FaqScope;
use App\Models\Relations\FaqRelation;
use App\Models\Attributors\FaqAttributor;

class Faq extends Model
{
    use FaqScope, FaqRelation, FaqAttributor;

    protected $table = 'faqs';

    protected $fillable = [
        'ticket_id',
        'subject',
        'description',
        'author_id'
    ];

    public function getSubject()
    {
        $ticket = $this->ticket;

        if($ticket)
        {
            return $ticket->subject;
        }

        return $this->subject;
    }
}