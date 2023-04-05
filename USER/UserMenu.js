import React from 'react';
import  {NavLink} from 'react-router-dom';


const UserMenu = () => {
  return (
    <div className='text-center'>
    <div className="list-group">
    <h1>User Dashboard</h1>
 <NavLink to="/dash/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
 <NavLink to="/dash/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
 
 
 </div>
 
    </div>
  )
}

export default UserMenu;