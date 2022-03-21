<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tblcars extends Model
{
    use HasFactory;
    protected $table = 'tblcars';

    //Relacion uno a uno
    public function user(){
        return $this->belongsTo('App\Models\tblusers','user_id');
    }
}
