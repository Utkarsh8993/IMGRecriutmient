import React from 'react'
import { Link } from 'react-router-dom';
import MacBookPro141 from './mac-book-pro141';
import Nav from './Nav';
import { useState } from 'react';
import { useSelector } from "react-redux";


const Login = () => {
    const { login} = useSelector((state) => state)
  




  return (
    
    <div>
    <Nav />
       
      
    </div>
  )
}

export default Login
