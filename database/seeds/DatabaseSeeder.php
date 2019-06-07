<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DefaultUsersRoles::class);
        $this->call(DefaultProjects::class);
        $this->call(DefaultPrioritiesSeeder::class);
        $this->call(DefaultTicketStatuses::class);
    }
}
