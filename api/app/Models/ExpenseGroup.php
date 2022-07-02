<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseGroup extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'amount_total',
        'month'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(ExpenseItem::class, 'group_id');
    }

    /**
     * Strictly increase amount total value. Keeps us from accidentally setting amount total.
     * 
     * @return $this
     */
    public function increaseAmountTotal(float $amount)
    {
        $this->update([
            'amount_total' => $this->amount_total + $amount
        ]);
    }

    /**
     * Strictly decrease amount total value. Keeps us from accidentally setting amount total.
     * 
     * @return $this
     */
    public function decreaseAmountTotal(float $amount)
    {
        $this->update([
            'amount_total' => $this->amount_total - $amount
        ]);
    }

    /**
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string $date
     * @return void
     */
    public function scopeMonth($query, string $date)
    {
        $dt = Carbon::parse($date);

        $query->whereBetween('month', [
            $dt->firstOfMonth()->format('Y-m-d'),
            $dt->lastOfMonth()->format('Y-m-d')
        ]);
    }

    /**
     * Create the expense group if requested month is current month
     */
    public static function firstOrCreateOnDemand($date)
    {
        if (!is_null($instance = static::month($date)->first())) {
            return $instance;
        }

        $dt = Carbon::parse($date);

        $attributes = [
            'name' => $dt->format('F y'),
            'month' => $dt->firstOfMonth(),
            'amount_total' => 0
        ];

        return request()->user()->expenses()->save(
            new ExpenseGroup($attributes)
        );
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function ($group) {
            $group->user->bills
                ->filter(function ($bill) {
                    return $bill->isGoingToRecur();
                })
                ->each(function ($bill) use ($group) {
                    $group->increaseAmountTotal(
                        $bill->amount
                    );

                    $group->items()->save(
                        new ExpenseItem([
                            'type' => 'bill',
                            'amount' => $bill->amount,
                            'description' => $bill->description,
                            'due_at' => $bill->recur_at
                        ])
                    );
                });
        });
    }
}
