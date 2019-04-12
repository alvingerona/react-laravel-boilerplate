<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Entities\Notification;
use App\Validators\NotificationValidator;
use App\Contracts\Repository\NotificationRepositoryContract;

/**
 * Class NotificationRepository
 *
 * @package namespace App\Repositories;
 */
class NotificationRepository extends BaseRepository implements NotificationRepositoryContract
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Notification::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
