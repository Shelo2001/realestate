<?php

namespace App\Models;

use App\Models\Home;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HomeImages extends Model
{
    public function home()
    {
        return $this->belongsTo(Home::class);
    }
}
