<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

class AuthenticationController extends Controller
{
    public function register(Request $request){
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'phone_number'=>'required|integer|unique:users,phone_number',
            'password' => 'required|string|min:6',
            'avatar' => 'required'
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->password = bcrypt($request->password);
        if($request->avatar!=''){
            $strpos = strpos($request->avatar, ';');
            $sub = substr($request->avatar, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time().'.'.$ex;
            $img = Image::make($request->avatar)->resize(117,100);
            $upload_path = public_path()."/upload/";
            $img->save($upload_path.$name);
            $user->avatar = $name;
        } else {
            $user->avatar = 'image.png';
        }
        $user->save();
        $token = $user->createToken('Tokens')->plainTextToken;
        return response([
            "token"=>$token,
            "user"=>$user
        ],201);
    }

    public function login(Request $request){
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('Credentials not match', 401);
        }

        return response([
            'token' => auth()->user()->createToken('Tokens')->plainTextToken,
            'user' => auth()->user()
        ], 200);
    }

    public function logout(Request $request){
        auth()->user()->currentAccessToken()->delete();

        return response(["message"=>"Successfully logged out"],200);
    }
}
