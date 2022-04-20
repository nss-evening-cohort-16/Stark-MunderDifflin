import React from 'react';
import { Link } from 'react-router-dom';

export default function AppNavbar() {
  return (
    <div className='text-center mb-3'>
      <>
        <Link className='nav-link active' to='/home'>
          Home
        </Link>
        <Link className='nav-link active' to='/cart'>
          Cart
        </Link>
        <Link className='nav-link active' to='/details'>
          Details
        </Link>
      </>
    </div>
  );
}
