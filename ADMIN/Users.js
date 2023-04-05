import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const Users = () => {
  return (
    <Layout>
    <div className="container-fluid m-5 p-4">
     <div className="row">
       <div className="col-md-3 p-4">
         <AdminMenu />
       </div>
       <div className="col-md-7 p-5">
         <div className="card " >
          <h4>Users</h4>
         </div>
         
       </div>
     </div>
    </div>
     </Layout>
  )
}

export default Users;