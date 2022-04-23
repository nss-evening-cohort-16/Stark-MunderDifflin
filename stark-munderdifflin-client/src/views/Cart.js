import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { getPaperItemsByOrder } from '../data/cartData';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    getPaperItemsByOrder(1).then((items) => {
      setCartItems(items);
    });
  }, []);

  const quantityChange = () => {
    getPaperItemsByOrder(1).then((items) => {
      setCartItems(items);
      getTotal(cartItems);
    });
  };

  useEffect(() => {
    getTotal(cartItems);
  }, [cartItems]);

  const getTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const totalItemPrice = cartItem.price * cartItem.quantity;
      total += totalItemPrice;
    });
    total = Math.ceil(total * 100) / 100;
    setTotal(total);
  };

  return (
    <div className='cart-container'>
      <div className='cart-items-container'>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} quantityChange={quantityChange} />
        ))}
      </div>
      <button className='btn btn-success cart-btn'>Submit</button>
      Total: {total}
    </div>
  );
}
