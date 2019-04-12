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
    private $fileSystem;

    public function __construct()
    {
        $this->fileSystem = resolve('Illuminate\Contracts\Filesystem\Factory');
    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Role $model
     *
     * @return array
     */
    public function transform(Role $model)
    {
        return [
            'id' => (int) $model->id,
            'name' => $model->name,
        ];
    }
}
