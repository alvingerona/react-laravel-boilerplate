<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSlugField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::table('statuses', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique();
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->integer('duplicate_of')->comment('Ticket id of same contents.')->nullable();
            $table->boolean('is_faq')->default(true)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
