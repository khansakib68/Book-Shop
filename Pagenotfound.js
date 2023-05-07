import React from 'react';
import Layout from '../components/Layout/Layout';
import './csspage.css';

import {TbZoomExclamation } from 'react-icons/tb'

const Pagenotfound = () => {
  return (
    <Layout>
        <TbZoomExclamation id='excla'></TbZoomExclamation>
       <p className='page_txt'><span style={{color:"red" , fontSize:"35px"}} id='oops'>Oops!</span>That page can't be found</p>
        </Layout>
  )
}

export default Pagenotfound;