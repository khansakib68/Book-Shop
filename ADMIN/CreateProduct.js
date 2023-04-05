import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const CreateProduct = () => {
  return (
    <Layout>
    <div className="container-fluid m-5 p-4">
     <div className="row">
       <div className="col-md-3 p-4">
         <AdminMenu />
       </div>
       <div className="col-md-7 p-5">
         <div className="card " >
          <h4>Create Product</h4>
         </div>
         
       </div>
     </div>
    </div>
     </Layout>
  )
}

export default CreateProduct;