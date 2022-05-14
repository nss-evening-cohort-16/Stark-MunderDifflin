import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { getUserCart, closeOrder } from '../data/cartData';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [total, setTotal] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getUserCart().then((cart) => {
      if (cart.cartItems != null) {
        setCartItems(cart.cartItems);
        setCartId(cart.cartId);
      }
    });
  }, []);

  useEffect(() => {
    getTotal(cartItems);
  }, [cartItems]);

  const quantityChange = () => {
    getUserCart().then((cart) => {
      setCartItems(cart.cartItems);
      getTotal(cartItems);
    });
  };

  const getTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const totalItemPrice = cartItem.price * cartItem.quantity;
      total += totalItemPrice;
    });
    total = Math.ceil(total * 100) / 100;
    setTotal(total);
  };

  const submitCart = async () => {
    await closeOrder(cartId);
    navigate('/');
  };

  return (
    <div className='cart-container'>
      {cartItems.length === 0 ? (
        <h4>Cart is Empty</h4>
      ) : (
        <>
          <div className='cart-items-container page-section'>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                quantityChange={quantityChange}
              />
            ))}
          </div>
          <button className='btn btn-success cart-btn' onClick={submitCart}>
            Submit
          </button>
          Total: {total}
        </>
      )}
    </div>
  );
}
