<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'description',
        'recur_at',
        'recur_interval',
    ];

    public function user() {
        return $this->belongsTo(User::class)
    }

    /**
     * Check if bill is going to recur based on the interval
     */
    public function isGoingToRecur(): bool {
        $now = Carbon::now()->firstOfMonth();

        if ($this->recur_interval === 'annually') {
            // Not the same month of the same year of the given date
            return !$now->isSameMonth($this->recur_at);
        }

        if ($this->recur_interval === 'monthly') {
            // Not the same month no matter the year of the given date
            return !$now->isSameMonth($this->recur_at, false);
        }

        // @TODO: Throw an error
        return false
    }
}
