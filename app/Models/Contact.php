<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    /**
     * Attributes that are mass assignable
     *
     * @var string[]
     */
    protected $fillable = [
        "first_name",
        "last_name",
        "gender",
        "phone",
        "email",
        "birthday",
    ];

    /**
     * Attributes casts
     *
     * @var string[]
     */
    protected $casts = [
        'birthday' => 'date'
    ];

    /**
     * Appending attributes
     *
     * @var string[]
     */
    protected $appends = [
        'full_name'
    ];

    /**
     * Get fullName attribute
     *
     * @return string
     */
    public function getFullNameAttribute():string
    {
        return $this->attributes['first_name'] ." ". $this->attributes['last_name'];
    }
}
