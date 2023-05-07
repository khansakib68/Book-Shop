import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout/Layout";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import './csspage.css';

const ProductDetails = () => {
  const [auth] =useAuth();
  const [cart ,setCart] =useCart();
    const navigate = useNavigate();
    const params = useParams();
    const [product ,setProduct] = useState({});
    const [relatedProduct,setRelatedProduct]=useState([]);

    /*========get details==========*/
    useEffect(() =>{
     if(params?.slug) getProduct();
    },[params?.slug]);

  /*===========GET SINGLE PRODUCT===============*/
  const getProduct = async() =>{
    try {
       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
        setProduct(data?.product);
        getSimilarProduct(data?.product._id,data?.product.category._id);

    } catch (error) {
        console.log(error);
    }
  }
  /*===============get similar product===============*/
  const getSimilarProduct = async (pid,cid) =>{
    try {
        const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
        setRelatedProduct(data?.products);
    } catch (error) {
     console.log(error);   
    }
  };


  return (
    <Layout>
       <h1 className='text-center mt-2'> <u>Product Details</u> </h1>
       {/*===========PRODUCT DETAILS======*/}
       <div className="row productDetails  container ">
        <div className="col-md-5 ms-5 imageSIZE">
        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top setImg"
                    alt={product.name}
                    
                  />
        </div>
        <div className="col-md-5 mt-5 ms-2">
            <h5>Name : {product.name}</h5>
            <h5>Description : {product.description}</h5>
            <h5>Price : {product.price}</h5>
            <h5>Category : {product.category?.name}</h5>
            <button className='btn btn-danger '
                     onClick={() =>
                      {
                        if(auth.token){

                          setCart([...cart,product])
                          toast.success('Product added to your shopping cart') 
                        }
                        else{
                          toast.success('Please login first') 
                        }
                      }

                    }
                     >Add to Cart
                     </button>
            

        </div>
       </div>

       <div className="row productDetails ">
         <h2 className='text-center mt-5'><u>Similar Product</u></h2>
         {relatedProduct.length < 1 && <h4 className='text-center' style={{color:'red'}}><b style={{fontSize:'90px'}}>😞</b><br></br>No similar product found</h4>}
       </div>
       <div className="d-flex flex-wrap ms-4 mt-3">
            {relatedProduct?.map((p) => (
            
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top" style={{ height: "200px" }}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{p.name}</h5>
                    <p className="card-text text-center">{p.description.substring(0,25)}</p>
                    <p className="card-text text-center">BDT {p.price}</p>
                    <button className='btn btn-primary m-3' 
                    onClick={() => navigate(`/product/${p.slug}`)}
                    >See Details</button>

                   <button className='btn btn-danger '
                     onClick={() =>
                      {
                        if(auth.token){

                          setCart([...cart,p])
                          toast.success('Product added to your shopping cart') 
                        }
                        else{
                          toast.success('Please login first') 
                        }
                      }

                    }
                     >Add to Cart
                     </button>
                  </div>
                </div>
             
            ))}
            </div>


        </Layout>
  )
}

export default ProductDetails;