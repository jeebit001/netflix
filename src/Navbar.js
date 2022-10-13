import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    const[scroll, setScroll]=useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if (window.scrollY>30) {
                setScroll(true);
            }
            else{
                setScroll(false);
            }
        });
    },[]);
   
  return (
    <div className={`nav ${scroll && "nav--black"}`}>
        <Link to="/">
        <img className='nav__logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/185px-Netflix_2015_logo.svg.png" alt="" />
        </Link>
        <img className='nav__avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt="" />
      
    </div>
  )
}

export default Navbar
