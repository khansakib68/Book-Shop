import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";
import orderModel from "../models/orderModel.js";
export const createProductController =async (req,res) =>{
    try {
        const {name,description,price,category,quantity,shipping} =req.fields;
         const {photo}  =req.files;

         /*===PRODUCT VALIDATION===*/
          
         switch(true){
            case !name:
                return res.status(500).send({
                   error: 'name is required' 
                })
                case !description:
                return res.status(500).send({
                   error: 'description is required' 
                })
                case !price:
                return res.status(500).send({
                   error: 'price is required' 
                })
                case !category:
                return res.status(500).send({
                   error: 'category is required' 
                })
                case !quantity:
                return res.status(500).send({
                   error: 'quantity is required' 
                })
                case photo && photo.size > 1000000:
                return res.status(500).send({
                   error: 'photo is required' 
                })
         }



        const products =new productModel({...req.fields,slug:slugify(name)})
        
        if(photo){
            products.photo.data= fs.readFileSync(photo.path);
            products.photo.contentType= photo.type;


        }
      await products.save();
      res.status(201).send({
        success:true,
        message:'product added successfully',
        products,

      });


    } catch (error) {
        
        res.status(500).send({
            success:false,
            error,
            message:'error in creating product'
        });
    }

};

/*=====GET ALL PRODUCTS=====*/
export const getProductController =async (req,res) =>{
try {
   const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
   res.status(200).send({
      success:true,
      totalProducts : products.length,
      message:'all products',
      products,
   })
} catch (error) {
   
   res.status(500).send({
      success : false,
      message:'error in getting products',
      error 
   })
}
};
/*====GET SINGLE PRODUCT====*/
export const getSingleProductController =async (req,res) =>{
try {
   const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
   res.status(200).send({
      success:true,
      product,

   })
} catch (error) {
   
   res.status(500).send({
      success:false,
      message:'error while getting single product',
      error
   })
}
};
/*=====PRODUCT PHOTO CONTROLLER=====*/
export const productPhotoController = async (req, res) => {
   try {
     const product = await productModel.findById(req.params.pid).select("photo");
     if (product.photo.data) {
       res.set("Content-type", product.photo.contentType);
       return res.status(200).send(product.photo.data);
     }
      
   } catch (error) {
      
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

  /*====DELETE PRODUCT controller====*/
  export const deleteProductController = async (req,res ) =>{
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
         success:true,
         message: "product deleted successfully"
      })
      
    } catch (error) {
      
      res.status(500).send({
         success:false,
         message:"error while deleting product",
         error
      })
      
    }
  };
   /*===update product====*/
   export const updateProductController = async (req,res) =>{
      try {
         const {name,description,price,category,quantity,shipping} =req.fields;
          const {photo}  =req.files;
 
          /*===PRODUCT VALIDATION===*/
           
          switch(true){
             case !name:
                 return res.status(500).send({
                    error: 'name is required' 
                 })
                 case !description:
                 return res.status(500).send({
                    error: 'description is required' 
                 })
                 case !price:
                 return res.status(500).send({
                    error: 'price is required' 
                 })
                 case !category:
                 return res.status(500).send({
                    error: 'category is required' 
                 })
                 case !quantity:
                 return res.status(500).send({
                    error: 'quantity is required' 
                 })
                 case photo && photo.size > 1000000:
                 return res.status(500).send({
                    error: 'photo is required' 
                 })
          }
 
 
 
         const products =await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
         
         if(photo){
             products.photo.data= fs.readFileSync(photo.path);
             products.photo.contentType= photo.type;
 
 
         }
       await products.save();
       res.status(201).send({
         success:true,
         message:'product updated successfully',
         products,
 
       });
 
 
     } catch (error) {
         
         res.status(500).send({
             success:false,
             error,
             message:'error in update product'
         });
     }
 

   };

   /*=====product filter============*/
   export const productFilterController = async (req,res) =>{
      try {
         const {checked,radio } =req.body;
         let args = {};
         if(checked.length > 0) args.category =checked;
         if(radio.length) args.price ={$gte: radio[0], $lte:radio[1]}
         const products =await productModel.find(args);
         res.status(200).send({
            success:true,
            products,
         });

      } catch (error) {
        
         res.status(400).send({
            success:false,
            message:'error while filtering product',
            error
         });

      }
   };
   /*=========SEARCH PRODUCT==============*/
    export const searchController = async (req,res) =>{
      try {
         const {keyword} =req.params;
         const results = await productModel.find({
            $or:[
               {name:{$regex : keyword, $options: "i"}},
               {description :{$regex : keyword, $options: "i"}}
            ]
         }).select("-photo");
         res.json(results);
         
      } catch (error) {
         

         res.status(400).send({
            success:false,
            message:'error in search',
            error
         });
         
      }


    };

    /*================RELATED PRODUCT===================*/

    export const relatedProductController = async (req,res) =>{
      try {
         const {pid,cid} =req.params;
         const products= await productModel.find({
            category:cid,
            _id:{$ne:pid}
         }).select("-photo").limit(3).populate("category");
         res.status(200).send({
            success:false,
            products,

         });
         
      } catch (error) {
        
         res.status(400).send({
            success:false,
            error,
         });
      }

    };

    /*=====================ORDER/CHECKOUT=======================*/
    export const checkoutController = async (req, res) => {
     try {
      const {cart}=req.body;
     
         const order = new orderModel({
            products: cart,
            buyer:req.user._id,
         }).save();
         res.json({ok:true});
      
      
     } catch (error) {
      
      
     }
    };
