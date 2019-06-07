<?php

namespace App\Api\Controllers;

use Illuminate\Validation\ValidationException;
use App\Services\User\UpdateUserService;
use App\Services\User\SignUpService;
use App\Services\User\ChangePasswordService;
use App\Services\User\FindUserService;
use App\Services\User\UserListService;
use App\Services\User\StoreUserService;
use Illuminate\Http\Request;
use App\Services\User\UserGenerateReportService;

class UserController
{
    private $signUpService;
    private $updateUserService;
    private $changePasswordService;
    private $findUserService;
    private $generateReportService;

    public function __construct(
        SignUpService $signUpService,
        UpdateUserService $updateUserService,
        ChangePasswordService $changePasswordService,
        UserListService $usersListService,
        StoreUserService $storeUserService,
        FindUserService $findUserService,
        UserGenerateReportService $generateReportService

    ) {
        $this->signUpService = $signUpService;
        $this->updateUserService = $updateUserService;
        $this->changePasswordService = $changePasswordService;
        $this->usersListService = $usersListService;
        $this->storeUserService = $storeUserService;
        $this->findUserService = $findUserService;
        $this->generateReportService = $generateReportService;
    }

    public function signUp(Request $request)
    {
        $userInfo = $request->only(['first_name', 'last_name', 'email', 'password']);
        $csrfToken = $request->header('X-CSRF-TOKEN');

        return $this->signUpService->signUp($userInfo, $csrfToken);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        return $this->updateUserService->updateUser($data);
    }

    public function store(Request $request)
    {
        $userData = $request->only([
            'first_name',
            'last_name',
            'email',
            'password',
            'role'
        ]);
        
        return $this->storeUserService->storeUser($userData);
    }

    public function changePassword(Request $request)
    {
        $data = $request->only([
            'user_id',
            'old_password',
            'new_password',
            'new_password_confirmation'
        ]);

        return $this->changePasswordService->changePasswordResponse($data);
    }

    public function index(Request $request)
    {
        $filters = $request->all();


        return $this->usersListService->listResponse($filters);
    }

    public function show(Request $request, $userId)
    {
        return $this->findUserService->findUserResponse($userId);
    }

    public function generateReport(Request $request)
    {
        return $this->generateReportService->generateWithResponse($request->all());
    }    
}
