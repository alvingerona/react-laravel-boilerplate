<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'avatar'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function setPasswordAttribute($password)
    {
        $hash = resolve('Illuminate\Contracts\Hashing\Hasher');
        $this->attributes['password'] = $hash->make($password);
    }

    public function formatDate($date)
    {
        if(!$date)
        {
            return [];
        }

        return [
            'a' => $date->format('m/d/Y')
        ];
    }

    public function getName()
    {
        return $this->first_name . " " . $this->last_name;
    }
}
