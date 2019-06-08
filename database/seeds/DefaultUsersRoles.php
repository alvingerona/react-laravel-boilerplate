<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DefaultUsersRoles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            'support' => [
                'can.manage.user' => false
            ], 
            'admin' => [
                'can.manage.user' => true
            ], 
            'employee' => [
                'can.manage.user' => false
            ]
        ];

        foreach($roles as $name => $permissions)
        {
            $role = Role::whereName($name)->first();

            if(!$role)
            {
                $role = Role::create([
                    'name' => $name
                ]);
            }

            $this->createPermissions($permissions);
        }

        foreach($roles as $name => $permissions)
        {
            $role = Role::whereName($name)->first();
            $permissions = collect($permissions)->filter(function($bool, $permission){
                return $bool;
            })->map(function($permission, $name){

                return  $name;
            });

            $role->syncPermissions($permissions);
        }
        
    }

    public function createPermissions($permissions)
    {
        foreach($permissions as $permission => $bool)
        {
            $count = Permission::where('name', $permission)->count();

            if($count == 0)
            {
                Permission::create([
                    'name' => $permission
                ]);
            }
        }
    }
}
