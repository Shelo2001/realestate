<?php

namespace App\Models;

use App\Models\HomeImages;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Home extends Model
{
    public function Images()
    {
        return $this->hasMany(HomeImages::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable=[
        "description",
        "bedroom",
        "bathroom",
        "garage",
        "area",
        "country",
        "price",
        "city",
        "street",
        "zipCode",
        "imageUrls.*",
        "hasCentralHeating",
        "hasFirePlace",
        "hasLawn",
        "hasBikePath",
        "hasCentralCooling",
        "hasSwimmingPool",
        "user_id"
    ];
}
