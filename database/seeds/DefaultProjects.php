<?php

use Illuminate\Database\Seeder;

use App\Models\Project;

class DefaultProjects extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = [
            [
                'key' => "ERP",
                'name' => 'ERP',
                'categories' => [
                    "Technical",
                    "Functional",
                    "Other"
                ]
            ],
            [
                'key' => "NERP",
                'name' => 'None ERP',
                'categories' => [
                    "CCTV",
                    "Network",
                    "PC Repairs",
                    "Maintenance",
                    "Other"
                ]
            ],            
        ];

        foreach($projects as $projRow)
        {
            $project = Project::forKey($projRow['key'])->first();

            if(!$project)
            {
                $project = Project::create([
                    'name' => '',
                    'key' => $projRow['key']
                ]);
            }

            $project->update([
                'name' => $projRow['name']
            ]);

            foreach($projRow['categories'] as $cateName)
            {
                $category = $project->categories()->forName($cateName)->first();

                if(!$category)
                {
                    $project->categories()->create([
                        'proj_id' => $project->id,
                        'name' => $cateName
                    ]);
                }
            }
        }
    }
}
