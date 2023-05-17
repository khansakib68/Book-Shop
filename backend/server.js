import express from 'express';
import colors from 'colors' ;
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import productsRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from  'cors';


/*---------------------ENV CONFIGURE---------------------*/
dotenv.config();

/*---------------------DTABASE CONFIG--------------------*/
connectDB();

/*---------------------REST---------------------*/
const app =express();

/*---------------------MIDDLE_WARES---------------------*/
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

/*-------Routes-------*/
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productsRoutes);

/*--------------------REST API------------------*/

app.get("/",(req,res) =>{
    res.send("<h1>WELLCOME TO OUR BOOK-STORE</h1>");
});

/*--------------------PORT------------------*/

const PORT =process.env.PORT || 8080;

/*--------------------CHECK RUNNING------------------*/
app.listen(PORT , () =>{
    console.log(`server running ${PORT}`);
});