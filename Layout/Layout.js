import React from 'react' ;
import Footer from './Footer';
import Header from './Header';
import  { Toaster } from 'react-hot-toast';

const Layout = ({children}) =>{
    return(
        <div>
          <Header/>
          <main>
          <Toaster />
           {children}
          </main>
          <Footer/>
        </div>
    );
};
export default Layout ;