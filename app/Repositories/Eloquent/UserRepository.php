<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Models\Role;
use App\Presenters\UserPresenter;

use App\Criterias\OnlyOwnUserCriteria;
use App\Criterias\User\LowestTicketAssigned;
use App\Criterias\AllowedToListUserCriteria;

use Prettus\Repository\Eloquent\BaseRepository;
use App\Contracts\Repository\UserRepositoryContract;

class UserRepository extends BaseRepository implements UserRepositoryContract
{
    private $auth;

    public function boot()
    {
        $this->auth = resolve('Illuminate\Contracts\Auth\Factory');

        $this->pushCriteria(OnlyOwnUserCriteria::class);
        
    }

    public function model()
    {
        return User::class;
    }

    public function presenter()
    {
        return UserPresenter::class;
    }

    public function currentUser()
    {
        return $this->find($this->auth->user()->id);
    }

    public function setCurrentAvatar($fileUrl)
    {
        return $this->update(['avatar' => $fileUrl], $this->auth->user()->id);
    }

    public function getCurrentAvatarFile()
    {
        return $this->skipPresenter()->find($this->auth->user()->id)->avatar;
    }

    public function removeCurrentAvatar()
    {
        return $this->update(['avatar' => null], $this->auth->user()->id);
    }

    public function listOfUsers()
    {
        return $this->listsQuery()->paginate();
    }

    public function listsQuery($filter = null)
    {
        $this->popCriteria(OnlyOwnUserCriteria::class);
        $this->pushCriteria(AllowedToListUserCriteria::class);

        return $this->scopeQuery(function($query) use($filter){

            return $query;
        });
    }

    public function findOne($userId)
    {
        $this->popCriteria(OnlyOwnUserCriteria::class);
        
        return $this->find($userId);        
    }

    /**
     * Find the list resolver with lowest number of ticket.
     *
     * @return void
     */
    public function resolverLowestTicket()
    {
        $this->popCriteria(OnlyOwnUserCriteria::class);

        return $this->pushCriteria(LowestTicketAssigned::class)->first();
    }

    public function updateRole($roleId, $userId)
    {
        $user = $this->skipPresenter()->findOne($userId);
        $role = Role::find($roleId);
        $user->syncRoles([$role]);

        return $user;
    }

    public function ticketWatchers($ticketId)
    {
        $this->popCriteria(OnlyOwnUserCriteria::class);

        return $this->scopeQuery(function($query) use($ticketId){
            return $query->forTicketWatchers($ticketId);
        })->all();
    }
}
