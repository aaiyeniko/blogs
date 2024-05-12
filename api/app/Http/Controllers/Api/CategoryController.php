<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Response;

use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Get categories
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     */
    public function getCategories()
    {
        return CategoryResource::collection(Category::orderBy('id','DESC')->get());
    }

    /**
     * Get category by Id
     *
     *@param  \Illuminate\Http\Request  $id
     * @return Response | Illuminate\Http\Resources\Json\JsonResource
     */
    public function getCategoryById($id)
    {
        $category_exists = Category::where('id',$id)->first();
        if ($category_exists) {
            return new CategoryResource(Category::findOrFail($id));
        }
        return Response::json(['error' => 'Category not found']);
    }

    /**
     * Insert categories
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function insertCategory(Request $request)
    {
        $validators = Validator::make($request->all(), [
            'title'=>'required|unique:categories'
        ]);

        if($validators->fails()){
            return Response::json(['errors' => $validators->getMessageBag()->toArray()]);
        }

        $category = new Category();
        $category->title = $request->title;
        $category->slug = Str::slug($request->title);
        $category->save();

        return Response::json(['success' => 'Category created successfully']);
    }

    /**
     * Update categories
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function updateCategory(Request $request)
    {
        $validators = Validator::make($request->all(), [
            'id' => ['required', 'exists:categories,id'],
            'title' => ['required', Rule::unique('categories')->ignore($request->id)] 
        ]);

        if($validators->fails()){
            return Response::json(['errors'=>$validators->getMessageBag()->toArray()]);
        }


        $category = Category::find($request->id);
        if ($category) {
            $category->title = $request->title;
            $category->slug = Str::slug($request->title);
            $category->save();
    
            return Response::json(['success'=>'Category updated successfully']);
        }
        return Response::json(['error' => 'Category not found']);
    }

    /**
     * Delete category
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function deleteCategory(Request $request)
    {
        try{
            $category = Category::find($request->id);

            if($category) {
                $category->delete();
                return Response::json(['success' => 'Category deleted successfully']);
            }
            return Response::json(['error' => 'Category not found']);
        }catch(\Illuminate\Database\QueryException $exception){
            return Response::json([
                'error' => 'Can\'t delete Category belonging to an article.'
            ]);
        } 
    }
}
