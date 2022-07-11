<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\BillController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/password', [AuthController::class, 'password']);
    Route::put('/auth/profile', [AuthController::class, 'profile']);
    Route::put('/auth/avatar', [AuthController::class, 'avatar']);

    Route::get('/expense-groups/{group}', [ExpenseController::class, 'show']);
    Route::post('/expense-groups/{group}/items', [ExpenseController::class, 'store']);
    Route::put('/expenses-groups/{group}/items/{item}', [ExpenseController::class, 'update']);
    Route::delete('/expenses-groups/{group}/items/{item}', [ExpenseController::class, 'destroy']);

    Route::get('/bills', [BillController::class, 'index']);
    Route::post('/bills', [BillController::class, 'store']);
    Route::put('/bills/{bill}', [BillController::class, 'update']);
    Route::delete('/bills/{bill}', [BillController::class, 'destroy']);
});
