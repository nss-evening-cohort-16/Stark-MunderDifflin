import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Cart } from '../views/index';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
    </>
  );
}
