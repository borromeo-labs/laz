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
        'amount_total'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function items() {
        return $this->hasMany(ExpenseItem::class);
    }

    /**
     * Strictly increase amount total value. Keeps us from accidentally setting amount total.
     * 
     * @return $this
     */
    public function increaseAmountTotal(float $amount) {
        $this->update([
            'amount_total' => $this->amount_total + $amount
        ]);
    }

    /**
     * Strictly decrease amount total value. Keeps us from accidentally setting amount total.
     * 
     * @return $this
     */
    public function decreaseAmountTotal(float $amount) {
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

        $query->whereBetween('created_at', [
            $dt->firstOfMonth(),
            $dt->lastOfMonth()
        ]);
    }

    /**
     * Create the expense group if requested month is current month
     */
    public static function firstOrCreateOnDemand($date) {
        if (!is_null($instance = static::month($date)->first())) {
            return $instance;
        }
        
        $attributes = [
            'name' => Carbon::parse($date)->format('F y'),
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
            $group->user->bills->each(function ($bill) {
                if (!$bill->isGoingToRecur()) {
                    return;
                }

                $group->increaseAmountTotal(
                    $bill->amount
                );

                $item = Item::create([
                    'group_id' => $group->id,
                    'type' => 'bill',
                    'amount' => $bill->amount,
                    'description' => $bill->description,
                    'due_at' => $bill->recur_at
                ]);
            });
        });
    }
}
