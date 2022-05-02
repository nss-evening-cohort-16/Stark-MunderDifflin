import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PaperDetails, PaperForm, EditPaper } from '../components/index';
import { Home, Cart } from '../views/index';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/PaperDetail/:dbKey' element={<PaperDetails />} />
        <Route path='/Edit/:dbKey' element={<EditPaper />} />
        <Route path='/PaperForm' element={<PaperForm />} />
      </Routes>
    </>
  );
}
