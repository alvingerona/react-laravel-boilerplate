<?php

namespace App\Presenters;

use App\Transformers\FaqTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ContactPresenter.
 *
 * @package namespace App\Presenters;
 */
class FaqPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new FaqTransformer();
    }
}
