<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Transformers\DateTimeTransformer;
use App\Presenters\TicketPresenter;

/**
 * Models
 */
use App\Models\Faq;

/**
 * Class FaqTransformer.
 *
 * @package namespace App\Transformers;
 */
class FaqTransformer extends TransformerAbstract
{
    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Faq $model
     *
     * @return array
     */
    public function transform(Faq $model)
    {
        /**
         * NOTE: Please don't add comments on the resource.
         */

        return [
            'id' => (int) $model->id,
            'subject' => $model->getSubject(),
            'description' => $model->description,
            'author_id' => $model->author_id,
            'ticket_id' => $model->ticket_id,
            'ticket' => $this->formatTicket($model->ticket)
        ];
    }

    private function formatTicket($ticket)
    {
        if(!$ticket)
        {
            return null;
        }

        $presenter = new TicketPresenter;

        return $presenter->present($ticket);        
    }    
}
