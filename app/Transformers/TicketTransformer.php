<?php
namespace App\Transformers;

use App\Models\Ticket;
use League\Fractal\TransformerAbstract;
use App\Presenters\UserPresenter;
use App\Presenters\StatusPresenter;
use App\Presenters\TicketPresenter;
use App\Transformers\DateTimeTransformer;

/**
 * Class TicketTransformer.
 *
 * @package namespace App\Transformers;
 */
class TicketTransformer extends TransformerAbstract
{
    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param \App\Models\Ticket $model
     *
     * @return array
     */
    public function transform(Ticket $model)
    {
        /**
         * NOTE: Please don't add comments on the resource.
         */

        return [
            'id' => (int) $model->id,
            'subject' => $model->subject,
            'key' => $model->getKey(),
            'proj_id' => $model->proj_id,
            'category' => $model->category ,
            'reporter' => $this->formatReporter($model->reporter),
            'assignee' => $this->formatAssignee($model->latestAssignee()),
            'description' => $model->description,
            'excerpt' => $model->getExcerpt(),
            'title' => $this->formatTitle($model),
            'created_at' => (new DateTimeTransformer)->transform($model->created_at),
            'updated_at' => (new DateTimeTransformer)->transform($model->updated_at),
            'priority' => $model->priorityType,
            'status' => $this->formatStatus($model->status),
            'status_id' => $model->status_id,
            'is_close' => $model->isClose(),
            'duplicate_of' => $model->duplicate_of,
            'duplicate' => $this->formatTicket($model->orig, $model),
            'is_faq' => $model->is_faq,
            'order' => $model->order
        ];
    }

    private function formatTicket($ticket, $self)
    {
        if(!$ticket)
        {
            return null;
        }

        /**
         * Make sure self Ticket is not same with duplicate Ticket
         */
        if($self->id == $ticket->id)
        {
            return null;
        }

        $presenter = new TicketPresenter;

        return $presenter->present($ticket);        
    }

    private function formatStatus($status)
    {
        if(!$status)
        {
            return null;
        }

        $presenter = new StatusPresenter;

        return $presenter->present($status);        
    }

    private function formatTitle($model)
    {
        return $model->project->name . ': ' . $model->getKey();
    }

    private function formatAssignee($assinee)
    {
        $presenter = new UserPresenter;

        return $presenter->present($assinee);
    }

    private function formatReporter($reporter)
    {
        $presenter = new UserPresenter;

        return $presenter->present($reporter);
    }
}
