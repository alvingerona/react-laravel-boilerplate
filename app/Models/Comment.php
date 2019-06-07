<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\CommentScope;
use App\Models\Relations\CommentRelation;
use App\Models\Attributors\CommentAttributor;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use CommentScope, CommentRelation, CommentAttributor, SoftDeletes;

    protected $table = 'ticket_comments';

    protected $fillable = [
        'posted_by',
        'contents',
        'ticket_id'
    ];
}