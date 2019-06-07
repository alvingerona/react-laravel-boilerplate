<?php

use Illuminate\Http\Request;

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/users/me', '\App\Api\Controllers\SessionController@currentUser');
    Route::get('/logout', '\App\Api\Controllers\SessionController@logout');

    Route::apiResource('/users', '\App\Api\Controllers\UserController');
    Route::put('/users/{userId}/update-password', '\App\Api\Controllers\UserController@changePassword');

    /**
     * Oveview
     */
    Route::get('/utilities/overview', '\App\Api\Controllers\OverviewController@index');

    /**
     * Avatars
     */
    Route::get('/avatars', '\App\Api\Controllers\AvatarsController@get');
    Route::post('/avatars', '\App\Api\Controllers\AvatarsController@upload');
    Route::put('/avatars', '\App\Api\Controllers\AvatarsController@update');
    Route::delete('/avatars', '\App\Api\Controllers\AvatarsController@delete');

    /**
     * Tickets
     */
    Route::get('/tickets', '\App\Api\Controllers\TicketController@index');   
    Route::post('/tickets', '\App\Api\Controllers\TicketController@store');
    Route::put('/tickets/{ticketId}', '\App\Api\Controllers\TicketController@update');
    Route::get('/tickets/{ticketId}', '\App\Api\Controllers\TicketController@show');

    /**
     * Notifications
     */
    Route::get('/notifications/latest', '\App\Api\Controllers\NotificationsController@latest');
    Route::post('/notifications/mark-read', '\App\Api\Controllers\NotificationsController@markRead');
    /**
     * Roles
     */
    Route::get('/roles', '\App\Api\Controllers\RoleController@index'); 
});

/**
 * Password reset endpoints
 */
Route::post('/forgot-password', '\App\Api\Controllers\PasswordResetController@forgotPassword');
Route::post('/reset-password', '\App\Api\Controllers\PasswordResetController@resetPassword');

/**
 * These endpoints return JWT's, so make sure to wrap them in the encrypt cookies
 * middleware.
 */
Route::group(['middleware' => ['encryptCookies']], function () {
    Route::post('/login', '\App\Api\Controllers\SessionController@login');
    Route::post('/signup', '\App\Api\Controllers\UserController@signup');
});
