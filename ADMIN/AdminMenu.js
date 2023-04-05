import React from 'react'
import {NavLink} from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
   <div className='text-center'>
   <div className="list-group">
   <h1>Admin Panel</h1>
<NavLink to="/dash/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
<NavLink to="/dash/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
<NavLink to="/dash/admin/users" className="list-group-item list-group-item-action">Users</NavLink>

</div>

   </div>


    </>
  )
}

export default AdminMenu