import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try{
     const {name,email,password ,phone,address}=req.body
     /*------VALIDATION-------*/
     if(!name){
        return res.send({message: 'Name is require'})
     }
     if(!email){
        return res.send({message: 'Email is require'})
     }
     if(!password){
        return res.send({message: 'Password is require'})
     }
     if(!phone){
        return res.send({message: 'Phone number is require'})
     }
     if(!address){
        return res.send({message: 'Address is require'})
        /*-------CHECK_USER-------*/
        const exisitingUser = await userModel.findOne({email})
        
        /*---------existing-user-------*/
        if(exisitingUser){
            return res.status(200).send({
                success: true,
                message: 'already register please login',
            })
        }

     }
     /*--------REGISTER-USER-------*/

     const hashedPassword =await hashPassword(password)

     /*-------Save------*/
     const user = await new userModel({
      name,
      email,
      phone,
      address,
      password:hashedPassword,
   }).save()
          res.status(201).send({
            success:true,
            message: 'Register completted',
            user
          })
    } catch(error){
       
        res.status(500).send({
            success: false,
             message : 'Error in Registration',
             error
        })
    }
};

/*-----------POST <LOGIN----------*/

export const loginController = async (req,res) =>{
   try {
      const {email,password} = req.body;
      /*----VALIDATION----*/
      if(!email || !password){
         return res.status(404).send({
            success:false,
            message:'Invalid email or password'
         })
      }
      /*----CHECK USER----*/ 
      const user =await userModel.findOne({email})
      if(!user){
         return res.status(404).send({
            success: false,
            message:'Invalid  email'
         })
      }
      const match = await comparePassword(password,user.password)
      if(!match){
         return res.status(200).send({
           success:false,
           message: 'Invalid password'
         })

      }
      /*-----TOKEN-----*/
      const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
      res.status(200).send({
         success:true,
         message:'login successfully',
         user:{
            _id :user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address: user.address,
            role:user.role,
            
         },
         token,
      });
      
   } catch (error) {
      
      res.status(500).send({
         success:false,
         message: 'Error in login',
         error
      })
      
   }
};
/*---Test controller ---*/
export const testController =(req,res) => {
   res.send('Protected route');
};

/*=============UPDATE PROFILE==================*/

export const updateProfileController =async (req,res) =>{
   try {
      const {name,email,password,address,phone} =req.body;
      const user =await userModel.findById(req.user._id);

      /*====CHECK PASSWORD======*/
      // if(password){
      //    return res.json({error:'Password is required'})
      // }
      const hashedPassword =password ? await hashPassword(password): undefined;
      const updatedUser =await userModel.findByIdAndUpdate(req.user._id,{
         name: name || user.name,
         password:hashedPassword || user.password,
         phone: phone ||user.phone,
         address: address || user.address,

      },{new:true});
      res.status(200).send({
         success:true,
         message:'Updated profile successfully',
         updatedUser,
      });
      
   } catch (error) {
   
      res.status(400).send({
         success:false,
         message:'Error while updating profile',
         error,
      });
      
   }
};
/*================display order=-==================*/
export const getOrdersController = async(req,res)=>{
   try {
      const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer" , "name");
      res.json(orders);
      
   } catch (error) {
      
      res.status(500).send({
         success:false,
         message:'error while getting order',
         error
      });
   }

};
/*==================ADMIN ORDER========================*/
 export const  getOrdersforAdminController = async(req,res)=>{
   try {
      const orders = await orderModel
      .find().populate("products","-photo")
      .populate("buyer" , "name")
      .sort({createdAT:'-1'});
      res.json(orders);
      
   } catch (error) {
      
      res.status(500).send({
         success:false,
         message:'error while getting order',
         error
      });
   }

};
/*===================ORDER STATUS=====================*/
export const orderStatusController = async (req, res) => {
   try {
     const { orderId } = req.params;
     const { status } = req.body;
     const orders = await orderModel.findByIdAndUpdate(
       orderId,
       { status },
       { new: true }
     );
     res.json(orders);
   } catch (error) {
    
     res.status(500).send({
       success: false,
       message: "Error While Updateing Order",
       error,
     });
   }
 };