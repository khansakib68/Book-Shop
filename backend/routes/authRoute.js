import express from "express";
import {registerController, loginController,testController, updateProfileController, getOrdersController, getOrdersforAdminController, orderStatusController,} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

/*-----------ROUTER OBJECT ------------*/
const router = express.Router();

/*-----------ROUTing ------------*/

/*-----REGISTER_POST_METHOD------*/

router.post('/register', registerController);
/**-------login||post-------*/
router.post('/login',loginController)

/*---TEST ROUTERS---*/
router.get("/test",requireSignIn ,isAdmin, testController);
/*-----FORGOT PASSWORD_POST_METHOD------*/


/*------Protected Route------*/
router.get("/user-auth",requireSignIn,(req,res) => {
    res.status(200).send({ok:true});
});
router.get("/admin-auth",requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({ok:true});
});

/*=============UPDATE PROFILE==================*/
router.put('/profile',requireSignIn,updateProfileController);

export default router;

/*==================USER ORDER DISPLAY =====================*/
router.get('/orders',requireSignIn,getOrdersController);

/*==================ADMIN ORDER DISPLAY =====================*/
router.get('/all-orders',requireSignIn,isAdmin,getOrdersforAdminController);

/*=================ORDER STATUS=======================*/
router.put( "/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
  
  


