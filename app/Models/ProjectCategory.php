<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\ProjectCategoryScope;
use App\Models\Relations\ProjectCategoryRelation;
use App\Models\Attributors\ProjectCategoryAttributor;

class ProjectCategory extends Model
{
    use ProjectCategoryScope, ProjectCategoryRelation, ProjectCategoryAttributor;

    protected $table = 'project_categories';

    protected $fillable = [
        'name',
        'proj_id'
    ];
}