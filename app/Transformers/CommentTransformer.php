<?php
namespace App\Transformers;

use App\Models\Comment;
use League\Fractal\TransformerAbstract;
use App\Transformers\DateTimeTransformer;
use App\Presenters\UserPresenter;

/**
 * Class CommentTransformer.
 *
 * @package namespace App\Transformers;
 */
class CommentTransformer extends TransformerAbstract
{
    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Comment $model
     *
     * @return array
     */
    public function transform(Comment $model)
    {
        return [
            'id' => (int) $model->id,
            'contents' => $model->contents,
            'ticket_id' => $model->ticket_id,
            'ticket_key' => $model->ticket->getKey(),
            'posted_by' => $this->formatUser($model->postedBy),
            'created_at' => (new DateTimeTransformer)->transform($model->created_at),
        ];
    }
    
    private function formatUser($user)
    {
        $presenter = new UserPresenter;

        return $presenter->present($user);
    }    
}
