<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use Illuminate\Notifications\DatabaseNotification as CommentNotification;

/**
 * Class CommentNotificationTransformer.
 *
 * @package namespace App\Transformers;
 */
class CommentNotificationTransformer extends TransformerAbstract
{
    /**
     * Transform the CommentNotification entity.
     *
     * @param \App\Models\CommentNotification $model
     *
     * @return array
     */
    public function transform(CommentNotification $model)
    {
        return [
            'comment' => $model->data['commentData']['data'],
            'read_at' => $model->read_at
        ];
    }
}
