import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { getUserCart } from '../data/cartData';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [total, setTotal] = useState();

  useEffect(() => {
    getUserCart().then((cart) => {
      if (cart.cartItems != null) {
        setCartItems(cart.cartItems);
        setCartId(cart.cartId);
      }
    });
  }, []);

  const quantityChange = () => {
    getUserCart().then((items) => {
      setCartItems(items).then((cart) => {
        console.log(cart);
      });
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
      {cartItems.length === 0 ? (
        <h4>Cart is Empty</h4>
      ) : (
        <>
          <div className='cart-items-container'>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                quantityChange={quantityChange}
              />
            ))}
          </div>
          <button className='btn btn-success cart-btn'>Submit</button>
          Total: {total}
        </>
      )}
    </div>
  );
}
