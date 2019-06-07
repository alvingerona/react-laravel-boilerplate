<?php

namespace App\Presenters;

use App\Transformers\CommentNotificationTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CommentNotificationPresenter.
 *
 * @package namespace App\Presenters;
 */
class CommentNotificationPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CommentNotificationTransformer();
    }
}
