<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('homes', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->integer('bedroom');
            $table->integer('bathroom');
            $table->integer('garage');
            $table->integer('area');
            $table->integer('price');
            $table->string('country');
            $table->string('city');
            $table->string('street');
            $table->string('zipCode');
            $table->boolean('hasCentralHeating')->default(false);
            $table->boolean('hasFirePlace')->default(false);
            $table->boolean('hasLawn')->default(false);
            $table->boolean('hasBikePath')->default(false);
            $table->boolean('hasCentralCooling')->default(false);
            $table->boolean('hasSwimmingPool')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homes');
    }
};
