<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CategoryController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/category', [CategoryController::class, 'getCategories']);
Route::get('/category/{id}', [CategoryController::class, 'getCategoryById']);
Route::post('/category', [CategoryController::class, 'insertCategory']);
Route::put('/category', [CategoryController::class, 'updateCategory']);
Route::delete('/category', [CategoryController::class, 'deleteCategory']);

