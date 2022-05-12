import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PaperDetails, PaperForm, EditPaper } from '../components/index';
import { Home, Cart, User, UserOrder } from '../views/index';

export default function AppRoutes({ user }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/Cart' element={<Cart />} />
        <Route
          path='/PaperDetail/:dbKey'
          element={<PaperDetails user={user} />}
        />
        <Route path='/Edit/:dbKey' element={<EditPaper user={user} />} />
        <Route path='/PaperForm' element={<PaperForm user={user} />} />
        <Route path='/User' element={<User user={user} />} />
        <Route path='/Order/:orderId' element={<UserOrder user={user} />} />
      </Routes>
    </>
  );
}
