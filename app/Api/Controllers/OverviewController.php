<?php

namespace App\Api\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

/**
 * Services
 */
use App\Services\OverviewService;

class OverviewController
{
    private $serview;

    public function __construct( 
        OverviewService $service
    )
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return $this->service->getResponse();
    }
}