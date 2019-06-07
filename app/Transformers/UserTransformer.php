<?php
namespace App\Transformers;

use App\Models\User;
use App\Presenters\RolePresenter;
use League\Fractal\TransformerAbstract;

/**
 * Class UserTransformer.
 *
 * @package namespace App\Transformers;
 */
class UserTransformer extends TransformerAbstract
{
    private $fileSystem;

    public function __construct()
    {
        $this->fileSystem = resolve('Illuminate\Contracts\Filesystem\Factory');
    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\User $model
     *
     * @return array
     */
    public function transform(User $model)
    {
        $roles = $this->formatRoles($model->roles);
        $role = isset($roles['data'][0]) ? $roles['data'][0] : null;
        $permissions = $model->getPermissionsViaRoles()->map(function($per){


            return $per->name;
        });
        return [
            'id' => (int) $model->id,
            'first_name' => $model->first_name,
            'last_name' => $model->last_name,
            'email' => $model->email,
            'avatar' => $model->avatar ? $this->fileSystem->url($model->avatar) : null,
            'created_at' => $model->formatDate($model->created_at),
            'updated_at' => $model->updated_at,
            'name' => $model->first_name . ' ' . $model->last_name,
            'role' => $role,
            'permissions' => $permissions,
            'count_assigned_tickets' => $model->assignedTickets()->count(),
            /**
             * WARNING: roles is not use. This is useful on full version.
             */
            'roles' => $roles
        ];
    }

    private function formatRoles($roles)
    {
        if(!$roles)
        {
            return null;
        }

        $presenter = new RolePresenter;

        return $presenter->present($roles);        
    }
}
