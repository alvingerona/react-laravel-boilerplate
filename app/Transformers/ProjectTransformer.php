<?php
namespace App\Transformers;

use App\Models\Project;
use League\Fractal\TransformerAbstract;

/**
 * Class ProjectTransformer.
 *
 * @package namespace App\Transformers;
 */
class ProjectTransformer extends TransformerAbstract
{
    public function __construct()
    {
    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Project $model
     *
     * @return array
     */
    public function transform(Project $model)
    {
        return [
            'id' => (int) $model->id,
            'name' => $model->name,
            'key' => $model->key
        ];
    }
}
