<?php

namespace App\Http\Controllers;

use App\Models\ExpenseGroup;
use App\Models\ExpenseItem;
use Carbon\Carbon;

class ExpenseController extends Controller
{
    /**
     * Fetch all the details from an expense controller
     * 
     * @TODO: Validate $year
     */
    public function index(string $year)
    {
        $map = collect(range(1, 12))->keyBy(function ($month) use ($year) {
            // Let carbon safely format month so we don't have to pad it by hand
            return Carbon::parse("{$year}-{$month}")->format('Y-m');
        })->map(fn () => null);

        $groups = request()->user()->expenses()->withinTheYear($year)->get()->keyBy(function ($group) {
            return $group->month->format('Y-m');
        });

        // Fills the gaps so months that don't exist at least have their keys in the map
        // $groups = ({ "2022-02": { ... } })
        // $serialized = ({ "2022-01": null, "2022-02": { ... } })
        $serialized = $groups->union($map);

        return response()->json([
            'expense_groups' => $serialized
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
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
            // @TODO: Validate that due_at is within the same month as $group
            'due_at' => ['required', 'date_format:Y-m-d']
        ]);

        $group->increaseAmountTotal(
            request()->get('amount')
        );

        $item = $group->items()->save(
            new ExpenseItem([
                'type' => 'expense',
                'amount' => request()->get('amount'),
                'description' => request()->get('description'),
                'due_at' => request()->get('due_at'),
            ])
        );

        return response()->json([
            'expense_item' => $item
        ]);
    }

    /**
     * Update existing expense item
     */
    public function update(ExpenseItem $item)
    {
        request()->validate([
            'amount' => ['required', 'numeric'],
            'description' => ['max:255'],
            // @TODO: Validate that due_at is within the same month as $group
            'due_at' => ['required', 'date_format:Y-m-d']
        ]);

        $item->group->update([
            'amount_total' => $item->group->amount_total - $item->amount + request()->get('amount')
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
    public function destroy(ExpenseItem $item)
    {
        $item->group->decreaseAmountTotal($item->amount);

        $item->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
