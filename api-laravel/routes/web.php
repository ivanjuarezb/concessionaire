<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post("/register",[UserController::class, "postRegister"]);
Route::post("/login",[UserController::class, "postLogin"]);
//---------------------------------------------------------------
Route::get('/cars',[CarController::class,'getCars']);
Route::post('/store',[CarController::class,'postStore']);
Route::get('/show/{id}',[CarController::class,'getShow']);
Route::put('/update/{id}',[CarController::class,'putUpdate']);
Route::delete('/delete/{id}',[CarController::class,'deleteCar']);