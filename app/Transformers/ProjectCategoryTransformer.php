<?php
namespace App\Transformers;

use App\Models\ProjectCategory;
use League\Fractal\TransformerAbstract;

/**
 * Class ProjectCategoryTransformer.
 *
 * @package namespace App\Transformers;
 */
class ProjectCategoryTransformer extends TransformerAbstract
{
    public function __construct()
    {
    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\ProjectCategory $model
     *
     * @return array
     */
    public function transform(ProjectCategory $model)
    {
        return [
            'id' => (int) $model->id,
            'name' => $model->name
        ];
    }
}
