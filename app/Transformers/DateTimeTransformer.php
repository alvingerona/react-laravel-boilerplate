<?php
namespace App\Transformers;


/**
 * Class PriorityTypeTransformer.
 *
 * @package namespace App\Transformers;
 */
class DateTimeTransformer
{
    public function __construct()
    {

    }

    /**
     * Transform the Contact entity.
     *
     * @param Carbon|null $model
     *
     * @return array
     */
    public function transform($carbon)
    {
        if(!$carbon)
        {
            return null;
        }

        return [
            'a' => $carbon->format('Y-m-d'),
            'b' => $carbon->format('M d, Y h:i A'),
            'c' => $carbon->diffForHumans()
        ];
    }
}
