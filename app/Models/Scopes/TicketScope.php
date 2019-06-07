<?php
namespace App\Models\Scopes;

/**
 * Scope trait for Ticket Model
 */
trait TicketScope
{
    public function scopeForReporter($query, $userId)
    {
        return $query->where('reporter_id', $userId);
    }

    public function scopeForAssignee($query, $userId)
    {
        return $query->whereHas('assignee', function($query) use($userId){
            return $query->where('user_id', $userId);
        });
    }

    public function scopeForStatus($query, $statusId)
    {
        return $query->where(function($query) use($statusId){

            $query->where('status_id', $statusId);
            $query->orWhereHas('status.parent', function($query) use($statusId){
                $query->where('id', $statusId);
            });
        });
    }

    public function scopeGeneralSearch($query, $key)
    {
        return $query->where(function($query) use($key){
            $query->where('subject', 'like', '%' . $key . '%');
            return $query->orWhere('description', 'like', '%' . $key . '%');
        });
    }
    
    public function scopeHasCommentOfUser($query, $userId)
    {
        return $query->whereHas('comments', function($query) use($userId){
            return $query->where('posted_by', $userId);
        });
    }

    public function scopeForWatcher($query, $userId)
    {
        return $query->where(function($query) use($userId){
            $query->where(function($query) use($userId){
                return $query->hasCommentOfUser($userId);
            });

            $query->orWhere(function($query) use($userId){
                return $query->forReporter($userId);
            });

            $query->orWhere(function($query) use($userId){
                return $query->forAssignee($userId);
            });            

            return $query;
        });
    }
}