<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Response;

use App\Http\Resources\BlogResource;
use App\Models\Blog;

class BlogController extends Controller
{
    /**
     * Get blogs
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     */
    public function getBlogs()
    {
        return BlogResource::collection(Blog::orderBy('id','DESC')->get());
    }

    /**
     * Get blog by Id
     *
     *@param  \Illuminate\Http\Request  $id
     * @return Response | Illuminate\Http\Resources\Json\JsonResource
     */
    public function getBlogById($id)
    {
        $blog_exists = Blog::where('id',$id)->first();
        if ($blog_exists) {
            return new BlogResource(blog::find($id));
        }
        return Response::json(['error' => 'Blog not found']);
    }

    /**
     * Insert categories
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function insertBlog(Request $request)
    {
        $validators = Validator::make($request->all(), [
            'category_id' => ['required', 'exists:categories,id'],
            'title' => 'required',
            'body' => 'required|string'
        ]);

        if($validators->fails()) {
            return Response::json(['errors' => $validators->getMessageBag()->toArray()]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->author_id = 1;
        $blog->category_id = $request->category_id;
        $blog->body = $request->body;
        $blog->image = isset($request->image) ? $request->image : fake()->imageUrl(640, 480, null, true);
        $blog->save();

        return Response::json(['success' => 'Blog created successfully']);
    }

    /**
     * Update blog
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function updateBlog(Request $request)
    {
        $validators = Validator::make($request->all(), [
            'id' => ['required', 'exists:blogs,id'],
            'title' => 'required',
            'category_id' => ['required', 'exists:categories,id'],
            'body' => 'required' 
        ]);

        if($validators->fails()){
            return Response::json(['errors'=>$validators->getMessageBag()->toArray()]);
        }


        $blog = Blog::find($request->id);
        if ($blog) {
            $blog->title = $request->title;
            $blog->author_id = 1;
            $blog->category_id = $request->category_id;
            $blog->body = $request->body;
            $blog->image = $request->image;
            $blog->save();
    
            return Response::json(['success'=>'Blog updated successfully']);
        }
        return Response::json(['error' => 'Blog not found']);
    }

    /**
     * Delete blog
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function deleteBlog(Request $request)
    {
        $blog = Blog::find($request->id);

        if($blog) {
            $blog->delete();
            return Response::json(['success' => 'Blog deleted successfully']);
        }
        return Response::json(['error' => 'Blog not found']);
        
    }
}
