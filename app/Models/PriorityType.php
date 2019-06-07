<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\PriorityTypeScope;
use App\Models\Relations\PriorityTypeRelation;
use App\Models\Attributors\PriorityTypeAttributor;

class PriorityType extends Model
{
    use PriorityTypeScope, PriorityTypeRelation, PriorityTypeAttributor;

    protected $table = 'priority_types';

    protected $fillable = [
        'name',
        'is_default',
        'order'
    ];
}