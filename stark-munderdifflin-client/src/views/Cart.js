import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import getPaperItemsByOrder from '../data/cartData';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getPaperItemsByOrder(1).then((items) => {
      setCartItems(items);
      console.log(items);
    });
  }, []);

  return (
    <div className='cart-container'>
      <div className='cart-items-container'>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button className='btn btn-success cart-submit'>Submit</button>
    </div>
  );
}
