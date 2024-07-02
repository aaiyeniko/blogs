<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BlogController;

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

Route::get('/blog', [BlogController::class, 'getBlogs']);
Route::get('/blog/slug/{slug}', [BlogController::class, 'getBlogBySlug']);
Route::get('/blog/{id}', [BlogController::class, 'getBlogById']);
Route::post('/blog', [BlogController::class, 'insertBlog']);
Route::put('/blog/{id}', [BlogController::class, 'updateBlog']);
Route::delete('/blog', [BlogController::class, 'deleteBlog']);
