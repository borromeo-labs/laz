<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
        'month',
        'is_enabled'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'amount_total' => 'float',
        'month' => 'date:Y-m'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(ExpenseItem::class, 'group_id')->orderBy('created_at');
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
     * Attribute to check if group is active
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function active(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => Carbon::now()->firstOfMonth()->equalTo(
                Carbon::parse($attributes['month'])->firstOfMonth()
            )
        );
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
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string $date
     * @return void
     */
    public function scopeWithinTheYear($query, string $date)
    {
        $dt = Carbon::parse($date);

        $query->whereBetween('month', [
            $dt->firstOfYear()->format('Y-m-d'),
            $dt->lastOfYear()->format('Y-m-d')
        ]);
    }

    /**
     * Create the expense group if requested month is current month
     * 
     * @TODO: We should probably add a new function on query builder instead of hard-coding things here.
     * Alternatively, we can make a service class.
     */
    public static function firstOrCreateOnDemand($date)
    {
        $instance = request()->user()->expenses()->month($date)->first();

        if (!is_null($instance)) {
            return $instance;
        }

        $group = new ExpenseGroup([
            'name' => Carbon::parse($date)->format('F y'),
            'month' => Carbon::parse($date)->firstOfMonth()->format('Y-m-d'),
            'amount_total' => 0
        ]);

        if (!$group->active) {
            throw (new ModelNotFoundException)->setModel(ExpenseGroup::class);
        }

        return request()->user()->expenses()->save(
            $group
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

                    $due = Carbon::now()->set('day', $bill->recur_at->day)
                        ->format('Y-m-d');

                    $group->items()->save(
                        new ExpenseItem([
                            'type' => 'bill',
                            'amount' => $bill->amount,
                            'description' => $bill->description,
                            'due_at' => $due
                        ])
                    );
                });
        });
    }
}
