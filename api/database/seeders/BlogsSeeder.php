<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Category;

class BlogsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 10; $i++) { 
            $title = fake()->sentence();
            DB::table('blogs')->insert([
                'title'=> $title,
                'slug' => Str::slug($title),
                'body'=> fake()->paragraph(5, false),
                'author_id'=> 1,
                'category_id'=> 1,
                'image'=> fake()->imageUrl(640, 480, null, true),
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);
        }
    }
}
