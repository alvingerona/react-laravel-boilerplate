<?php

use Illuminate\Database\Seeder;

use App\Models\Status;

class DefaultTicketStatuses extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaults = [
            [
                'name' => 'Todo',
                'color' => 'yellow',
                'is_default' => true,
                'slug' => 'todo'
            ],
            [
                'name' => 'In Progress',
                'color' => 'blue',
                'slug' => 'in-progress'
            ],
            [
                'name' => 'Pending',
                'slug' => 'pending'
            ],
            [
                'name' => 'Fixed',
                'color' => 'green',
                'slug' => 'fixed',
                'child' => [
                    [
                        'name' => 'Close',
                        'on_board' => false,
                        'slug' => 'close'
                    ],        
                    [
                        'name' => 'Duplicate',
                        'on_board' => false,
                        'slug' => 'duplicate'
                    ],         
                    [
                        'name' => 'Transfer to the provider',
                        'on_board' => false,
                        'slug' => 'transfer-to-provider'
                    ],                
                ]
                ],
            [
                'name' => 'Won’t fix',
                'on_board' => false,
                'color' => 'red',
                'slug' => 'wont-fix'
            ],
        ];

        $this->doCreate( $defaults );
    }

    private function doCreate($items, $parentId = null)
    {
        foreach($items as $order => $item)
        {
            $item = $this->formatData($item);
            $status = Status::where(function($query) use($parentId){
                if($parentId)
                {
                    $query->where('parent_id', $parentId);
                }
            })->where('name', $item['name'])->first();

            if(!$status)
            {
                $status = Status::create([
                    'order' => $order,
                    'name' => $item['name'],
                    'parent_id' => $parentId
                ]);
            }

            $isDefault = isset($item['is_default']) ? $item['is_default'] : false;
            $color = isset($item['color']) ? $item['color'] : null;

            $status->update([
                'color' => $color,
                'order' => $order,
                'is_default' => $isDefault,
                'on_board' => $item['on_board']
            ]);

            $status->generateSlug($item['slug']);

            if($item['child'])
            {
                $this->doCreate($item['child'], $status->id);
            }
        }
    }

    private function formatData($item)
    {
        if(!isset($item['on_board']))
        {
            $item['on_board'] = true;
        }

        if(!isset($item['child']))
        {
            $item['child'] = null;
        }

        return $item;
    }
}
