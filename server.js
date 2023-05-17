import express from 'express';
import colors from 'colors' ;
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import productsRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from  'cors';
import path from 'path';
import {fileURLToPath} from 'url';

/*---------------------ENV CONFIGURE---------------------*/
dotenv.config();

/*---------------------DTABASE CONFIG--------------------*/
connectDB();

/*==========ESMODULE-FIX================*/
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);


/*---------------------REST---------------------*/
const app =express();

/*---------------------MIDDLE_WARES---------------------*/
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));

/*-------Routes-------*/
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productsRoutes);

/*--------------------REST API------------------*/

app.use('*',function(re,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

/*--------------------PORT------------------*/

const PORT =process.env.PORT || 8080;

/*--------------------CHECK RUNNING------------------*/
app.listen(PORT , () =>{
   
});
