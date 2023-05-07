import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout >
      <div className="container">
        <div className="text-center mt-2">
          <h1>Search Resuts</h1>
          <h5>
            {values?.results.length < 1
              ? "No Products Found"
              : `Product found ${values?.results.length}`}
          </h5>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
            
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
                    <button className='btn btn-danger '>Add to Cart</button>
                  </div>
                </div>
             
            ))}
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search;