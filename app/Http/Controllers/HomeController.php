<?php

namespace App\Http\Controllers;

use App\Models\Home;
use App\Models\HomeImages;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function createHomeListing(Request $request ){
        $validatedData = $request->validate([
            'description' => 'required',
            'bedroom' => 'required',
            'bathroom' => 'required',
            'garage' => 'required',
            'area' => 'required',
            'country' => 'required',
            'price' => 'required',
            'city' => 'required',
            'street' => 'required',
            'zipCode' => 'required',
            'imageUrls.*' => 'required',
            'hasCentralHeating'=>'required',
            'hasFirePlace'=>'required',
            'hasLawn'=>'required',
            'hasBikePath'=>'required',
            'hasCentralCooling'=>'required',
            'hasSwimmingPool'=>'required',
            'user_id'=>'required'
        ]);
    
        // Create a new Product model and fill it with the form data
        $home = new Home;
        $home->fill($validatedData);
        $home->save();
    
        // Create a new ProductImage model for each image URL and associate it with the product
        foreach ($validatedData['imageUrls'] as $url) {
            $image = new HomeImages;
            $image->src = $url;
            $home->images()->save($image);
        }
    
        return response(["message"=>"successfully created"]);

    }

    public function getHomeListing(){
        $homes=Home::with('Images')->paginate(4);
       
        return response()->json([
            "homes" => $homes
        ]);
    }

    public function getSingleListing($id){
        $home=Home::where('id',$id)->with('User')->with('Images')->first();
        return response()->json([
            "home" => $home
        ]);
    }
}
