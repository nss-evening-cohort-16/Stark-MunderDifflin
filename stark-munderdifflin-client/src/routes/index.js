import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PaperDetails from '../components/PaperDetail';
import { Home, Cart } from '../views/index';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/PaperDetail/:dbKey' element={<PaperDetails />} />
      </Routes>
    </>
  );
}
