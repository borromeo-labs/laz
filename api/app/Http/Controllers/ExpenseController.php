<?php

namespace App\Http\Controllers;

use App\Models\ExpenseGroup;
use App\Models\ExpenseItem;

class ExpenseController extends Controller
{
    /**
     * Fetch all the details from an expense controller
     */
    public function index()
    {
        return response()->json([
            'expense_groups' => request()->user()->groups
        ]);
    }

    /**
     * Fetch all the details from an expense group and its items
     */
    public function show(ExpenseGroup $group)
    {
        return response()->json([
            'expense_group' => $group->load('items')
        ]);
    }

    /**
     * Record a new expense item into an expense group
     */
    public function store(ExpenseGroup $group)
    {
        request()->validate([
            'amount' => ['required'],
            'description' => ['required', 'max:255'],
            'due_at' => ['required', 'date']
        ]);

        $group->update([
            'amount_total' => request()->get('amount_total')
        ]);

        $item = request()->user()->groups()->create(
            [
                'group_id' => $group->id,
                'type' => 'expense',
                'amount' => request()->get('amount'),
                'description' => request()->get('description'),
                'due_at' => request()->get('due_at'),
            ]
        );

        return response()->json([
            'expense_item' => $item
        ]);
    }

    /**
     * Update existing expense item
     */
    public function update(ExpenseGroup $group, ExpenseItem $item)
    {
        request()->validate([
            'amount' => ['required'],
            'description' => ['required', 'max:255'],
            'due_at' => ['required', 'date']
        ]);

        $group->update([
            'amount_total' => $group->amount_total - $item->amount + request()->get('amount')
        ]);

        $item->update(
            request()->only(['amount', 'description', 'due_at'])
        );

        return response()->json([
            'expense_item' => $item
        ]);
    }

    /**
     * Delete existing expense item
     */
    public function destroy(ExpenseGroup $group, ExpenseItem $item)
    {
        $item->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
