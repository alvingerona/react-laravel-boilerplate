<?php

namespace App\Presenters;

use App\Transformers\PriorityTypeTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ContactPresenter.
 *
 * @package namespace App\Presenters;
 */
class PriorityTypePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new PriorityTypeTransformer();
    }
}
