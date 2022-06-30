<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bill;

class BillController extends Controller
{
    public function index()
    {
        return response()->json([
            'bills' => request()->user()->bills
        ]);
    }

    public function store()
    {
        request()->validate([
            'amount' => ['required'],
            'description' => ['required', 'max:255'],
            'recur_at' => ['required', 'date'],
            'recur_interval' => ['required', 'regex:/annually|monthly/'],
        ]);

        $bill = request()->user()->bills()->create(
            request()->only(['amount', 'description', 'recur_at', 'recur_interval'])
        );

        return response()->json([
            'bills' => $bill
        ]);
    }

    public function update(Bill $bill)
    {
        request()->validate([
            'amount' => ['required'],
            'description' => ['required', 'max:255']
        ]);

        $bill = $bill->update(
            request()->only(['amount', 'description'])
        );

        return response()->json([
            'bills' => $bill
        ]);
    }

    public function destroy(Bill $bill)
    {
        $bill->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
