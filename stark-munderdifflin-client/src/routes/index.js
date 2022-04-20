<<<<<<< HEAD
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Cart } from '../views/index'

export default function AppRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Cart" element={<Cart />}/>
        </Routes>
    </>
  )
}
=======
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
// import Details from '../views/Details';
// import Cart from '../views/Cart';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        {/* <Route exact path="/cart" component={Cart} />
        <Route exact path="/details" component={Details} /> */}
      </Switch>
    </div>
  );
}
>>>>>>> main
