<?php
namespace App\Models\Scopes;

/**
 * Scope trait for Comment Model
 */
trait CommentScope
{
    public function scopeForPostedBy($query, $userId)
    {
        return $query->where('posted_by', $userId);
    }
}