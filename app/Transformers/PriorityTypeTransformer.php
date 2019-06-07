<?php
namespace App\Transformers;

use App\Models\PriorityType;
use League\Fractal\TransformerAbstract;

/**
 * Class PriorityTypeTransformer.
 *
 * @package namespace App\Transformers;
 */
class PriorityTypeTransformer extends TransformerAbstract
{
    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\PriorityType $model
     *
     * @return array
     */
    public function transform(PriorityType $model)
    {
        return [
            'id' => (int) $model->id,
            'name' => $model->name,
            'is_default' => $model->is_default
        ];
    }
}
