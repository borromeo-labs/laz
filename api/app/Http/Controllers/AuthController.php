<?php

namespace App\Http\Controllers;

use App\Models\User;

class AuthController extends Controller
{
    public function register()
    {
        request()->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'name' => 'required'
        ]);

        $user = User::create([
            'email' => request()->get('email'),
            'name' => request()->get('name'),
            'password' => bcrypt(request()->get('email')),
        ]);

        return response()->json([
            'user' => $user
        ]);
    }

    public function user()
    {
        return response()->json([
            'user' => request()->user()
        ]);
    }

    public function password()
    {
        request()->validate([
            'old_password' => 'required|current_password:api|min:8',
            'password' => 'required|confirmed'
        ]);

        request()->user->update([
            'password' => bcrypt(request()->get('password'))
        ]);

        return response()->json([
            'user' => request()->user()
        ]);
    }

    public function profile()
    {
        request()->validate([
            'name' => 'required'
        ]);

        request()->user->update([
            'name' => request()->get('name')
        ]);

        return response()->json([
            'user' => request()->user()
        ]);
    }

    public function avatar()
    {
        request()->user->update([
            'avatar' => request()->get('avatar')
        ]);

        return response()->json([
            'user' => request()->user()
        ]);
    }
}
