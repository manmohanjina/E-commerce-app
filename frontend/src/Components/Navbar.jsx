import React from 'react'
import './Navbar.css';

const Navbar = () => {
  return (
    <div id='nav' >
      <div>
        <div className=''>Hambuger Icon</div>
        <div className=''>My Account</div>
      </div>

      <div className='navcenter'>Logo</div>

      <div className='navDiv'>
        <div className='navIcons'>Search Bar</div>
        <div className='navIcons'>Wishlist Icon</div>
        <div className='navIcons'>Cart</div>
      </div>
      
    </div>
  )
}

export default Navbar