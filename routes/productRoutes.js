import express, { Router } from 'express';
import { checkoutController, createProductController, deleteProductController, getProductController, getSingleProductController,  productFilterController, productPhotoController, relatedProductController, searchController, updateProductController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router =express.Router()

/*===CREATE PRODUCT ROUTES===*/
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

/*===update PRODUCT ROUTES===*/
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

/*======GET PRODUCT=======*/
router.get('/get-product', getProductController);

/*======GET SINGLE PRODUCT=======*/
router.get("/get-product/:slug",getSingleProductController);

/*======GET PHOTO=======*/
router.get('/product-photo/:pid',productPhotoController);

/*======delete product=======*/
router.delete('/delete-product/:pid', deleteProductController);

/*======FILTER PRODUCT======*/
router.post('/product-filters' ,productFilterController);

/*======SEARCH PRODUCT======*/

router.get('/search/:keyword',searchController);

/*================SIMILAR PRODUCT=================*/

router.get('/related-product/:pid/:cid',relatedProductController);

/*=================ORDER/CHECKOUT==================*/
router.post('/checkout',requireSignIn,checkoutController)


export default router;