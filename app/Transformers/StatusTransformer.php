<?php
namespace App\Transformers;

use App\Models\Status;
use League\Fractal\TransformerAbstract;
use  App\Presenters\StatusPresenter;

/**
 * ClassStatusTransformer.
 *
 * @package namespace App\Transformers;
 */
class StatusTransformer extends TransformerAbstract
{
    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Status $model
     *
     * @return array
     */
    public function transform(Status $model)
    {
        $presenter = new StatusPresenter;
        $colorKeys = [
            'red' => 'danger',
            'yellow' => 'warning',
            'green' => 'success',
            'blue' => 'primary'
        ];
        $colorKey = isset($colorKeys[$model->color]) ? $colorKeys[$model->color] : 'secondary';
        $label = $model->name;

        if($model->parent)
        {
            $label = $model->parent->name . ": " . $model->name;
        }

        return [
            'id' => (int) $model->id,
            'name' => $model->name,
            'children' => $presenter->present($model->children),
            'color' => $model->color,
            'color_key' => $colorKey,
            'slug' => $model->slug,
            'parent_slug' => $model->parent ? $model->parent->slug : null,
            'label' => $label,
            'on_board' => $model->on_board,
            /**
             * When have parent then use parent id else use self id.
             */
            'top_id' => $model->parent ? $model->parent->id : $model->id
        ];
    }
}
