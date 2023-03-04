<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthenticationController;
use App\Mail\SendMail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/logout', [AuthenticationController::class, 'logout']);
    

});

Route::post('/home/createlisting', [HomeController::class,"createHomeListing"]);
Route::get('/home/listings', [HomeController::class,"getHomeListing"]);
Route::get('/home/listing/{id}', [HomeController::class,"getSingleListing"]);
Route::get('/home/similar/{city}/{id}', [HomeController::class,"getSimilarListing"]);
Route::post('/contact', function (Illuminate\Http\Request $request) {
    $data = $request->validate([
        'email' => 'required|email',
        'name' => 'required|string|max:255',
        'message' => 'required|string',
        'owner_email'=>'required'
    ]);

    Mail::to($data['owner_email'])->send(new SendMail($data));

    return response()->json(['message' => 'Email sent!']);    
});