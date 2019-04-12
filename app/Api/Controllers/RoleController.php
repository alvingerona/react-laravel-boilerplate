<?php

namespace App\Api\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

use App\Services\Role\LoadRolesService;

class RoleController
{
    private $rolesService;

    public function __construct(
        LoadRolesService $rolesService
    ) {
        $this->rolesService = $rolesService;
    }

    public function index(Request $request)
    {
        return $this->rolesService->loadRoles();
    }
}