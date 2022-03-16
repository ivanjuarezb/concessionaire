<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = 'tblscars';

    //Relacion uno a uno
    public function user(){
        return $this->belongsTo('App\User','user_id');
    }
}
