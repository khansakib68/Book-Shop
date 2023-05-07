import React ,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import {BiReset} from 'react-icons/bi'
import axios from 'axios';
import { Checkbox,Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import './csspage.css';
import { toast } from 'react-hot-toast';

    
   const HomePage = () => {
    const [auth] =useAuth();
    const [cart ,setCart] =useCart();
    const navigate = useNavigate();
   const [products ,setProducts] =useState([]);
   const [categories,setCategories] =useState([]);
    const [checked ,setChecked] =useState([]);
    const [radio ,setRadio] =useState([]);

   /*====get all categories====*/
 const getAllCategory = async() =>{

  try {

    const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
    if (data?.success){
      setCategories(data?.category);
    }
    
  } catch (error) {
    console.log(error);
  

  }

 };

 useEffect(() =>{
 getAllCategory();
 },[])

   /*===GET ALL PRODUCT===*/
        const getAllProducts =async () =>{
          try {
            const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProducts(data?.products);
            
          } catch (error) {
            console.log(error);
          }
        };

        /*====FILTER BY CATEGORY=====*/
        const handleFilter = (value, id) => {
          let all = [...checked];
          if (value) {
            all.push(id);
          } else {
            all = all.filter((c) => c !== id);
          }
          setChecked(all);
        };

        
        // useEffect(() => {
        //   if (!checked.length || !radio.length) getAllProducts();
        // }, [checked.length, radio.length]);
      
        useEffect(() => {
          if (checked.length || radio.length) filterProduct();
          else{
            getAllProducts();
          }
        }, [checked, radio]);
        /*======GET FILTER PRODUCT======*/
        const filterProduct = async () =>{
          try {
            const{data} =await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio,});
           setProducts(data?.products);
            
          } catch (error) {
            console.log(error);

            
          }
        }


  return (
    <Layout>
        <div className="row mt-3">
          <div className="col-md-3 ">
            <div className="d-flex">
              <BiReset className='resetButton'
              onClick={() => window.location.reload()}></BiReset>
            </div>
            {/*FILTER BY CATEGORY */}
          <h5 className='text-center'> Filter By Category</h5>
          <div className="category">
          <div className='d-flex flex-wrap '>
                {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
              </div>
          </div>
              {/*FILTER BY PRICE */}

           <h5 className='text-center'> Filter By Price</h5>
          <div className='d-flex flex-colum m-3'>

             <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
             </Radio.Group>
              
         </div>

          </div>

          <div className="col-md-9">
            <h1 className='text-center'> ALL PRODUCTS</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
            
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
                          localStorage.setItem('cart',JSON.stringify([...cart,p]))
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
          </div>
        </div>
        </Layout>
  )
}

export default HomePage;