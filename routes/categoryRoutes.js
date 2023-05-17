import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import {requireSignIn,isAdmin} from './../middlewares/authMiddleware.js';

const router =express.Router()

/*====ROUTES=====*/
/*=====CREATE CATEGORY*/
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

/*====Update CATEGORY====*/
router.put('/update-category/:id', requireSignIn ,isAdmin, updateCategoryController);

/*====GET ALL CATEGORY====*/
router.get('/get-category',categoryController);

  /*SINGLE CATEGORY*/
  router.get('/single-category/:slug',singleCategoryController);

  /*===DELETE CATEGORY===*/

  router.delete('/delete-category/:id',requireSignIn, isAdmin, deleteCategoryController);

export default router ;