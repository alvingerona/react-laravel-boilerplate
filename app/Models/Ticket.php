<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\TicketScope;
use App\Models\Relations\TicketRelation;
use App\Models\Attributors\TicketAttributor;

class Ticket extends Model
{
    use TicketScope, TicketRelation, TicketAttributor;

    protected $table = 'tickets';

    protected $fillable = [
        'subject',
        'proj_id',
        'proj_category_id',
        'key_number',
        'reporter_id',
        'description',
        'priority_type_id',
        'status_id',
        'duplicate_of',
        'is_faq',
        'order'
    ];

    public function getKey()
    {
        return $this->project->key . '-' . $this->key_number;
    }

    public function latestAssignee()
    {
        return $this->assignee()->orderBy('created_at', 'desc')->first();
    }

    public function isClose()
    {
        if(!$this->status)
        {
            return false;
        }

        if($this->status->slug ==  'wont-fix')
        {
            return true;
        }

        return ($this->status && $this->status->parent && $this->status->parent->slug == 'fixed');
    }

    public function getExcerpt()
    {
        if(!$this->description){
            return $this->description;
        }
        
        return str_limit($this->description, 150);
    }
}