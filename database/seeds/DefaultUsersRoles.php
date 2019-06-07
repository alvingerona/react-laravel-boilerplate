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
                'can.manage.user' => false,
                'can.manage.ticket.status' => true,
                'can.manage.ticket.assignee' => true,
                'can.manage.ticket.priority' => true,
                'have.kanban' => true,
                'can.report' => false,
                'can.ticket.edit' => true,
                'can.ticket.delete' => true,
                'can.ticket.change.status' => true,
                'can.faq.add' => true,
                'can.faq.delete' => true,
                'can.faq.edit' => true
            ], 
            'admin' => [
                'can.manage.user' => true,
                'can.manage.ticket.status' => true,
                'can.manage.ticket.assignee' => true,
                'can.manage.ticket.priority' => true,
                'have.kanban' => true,
                'can.report' => true,
                'can.ticket.edit' => true,
                'can.ticket.delete' => true,
                'can.ticket.change.status' => true,
                'can.faq.add' => true,
                'can.faq.delete' => true,
                'can.faq.edit' => true
            ], 
            'employee' => [
                'can.manage.user' => false,
                'can.manage.ticket.status' => false,
                'can.manage.ticket.assignee' => false,
                'can.manage.ticket.priority' => false,
                'have.kanban' => false,
                'can.report' => false,
                'can.ticket.edit' => false,
                'can.ticket.delete' => false,
                'can.ticket.change.status' => false,
                'can.faq.add' => false,
                'can.faq.delete' => false,
                'can.faq.edit' => false
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
