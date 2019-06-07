<?php

use Illuminate\Database\Seeder;

use App\Models\PriorityType;

class DefaultPrioritiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $default = [
            [
                'name' => 'Critical',
                'is_default' => false,
                'order' => 0
            ],
            [
                'name' => 'Non-Critical',
                'is_default' => true,
                'order' => 1
            ]
        ];

        foreach($default as $data)
        {
            $priority = PriorityType::where('name', $data['name'])->first();

            if(!$priority)
            {
                $priority = PriorityType::create([
                    'name' => $data['name'],
                    'is_default' => $data['is_default'],
                    'order' => $data['order']
                ]);
            }

            $priority->update([
                'name' => $data['name'],
                'is_default' => $data['is_default'],
                'order' => $data['order']
            ]);            
        }
    }
}
