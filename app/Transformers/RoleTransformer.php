<?php
namespace App\Transformers;

use App\Models\Role;
use League\Fractal\TransformerAbstract;

/**
 * Class RoleTransformer.
 *
 * @package namespace App\Transformers;
 */
class RoleTransformer extends TransformerAbstract
{

    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Role $model
     *
     * @return array
     */
    public function transform($model)
    {
        return [
            'id' => (int) $model->id,
            'name' => $model->name,
            'label' => ucfirst($model->name)
        ];
    }
}