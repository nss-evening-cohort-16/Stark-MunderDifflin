import React, { useState, useEffect } from 'react';
import { updateOrderItemQuantity, deleteCartItem } from '../data/cartData';
import updateIcon from '../assets/updateIcon.ico';
import deleteIcon from '../assets/deleteIcon.ico';

export default function CartItem({ item, quantityChange }) {
  const [itemQty, setItemQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    setItemQuantity(Number(e.target.value));
  };

  const updateQuantity = async () => {
    console.log(itemQty);
    if (itemQty === 0) deleteItem();
    else await updateOrderItemQuantity(item.id, itemQty);
    quantityChange();
  };

  const deleteItem = async () => {
    await deleteCartItem(item.id);
    quantityChange();
  };

  return (
    <div>
      <table className='cart-table'>
        <thead>
          <tr className='cart-table-row'>
            <td className='cart-table-cell-h-img'></td>
            <td className='cart-table-cell'>Name</td>
            <td className='cart-table-cell'>Quantity</td>
            <td className='cart-table-cell'>Price</td>
          </tr>
        </thead>
        <tbody>
          <tr className='cart-table-row'>
            <td className='cart-table-cell-r-img'>
              <img src={item.imageURL} alt='paper'></img>
            </td>
            <td className='cart-table-cell'>{item.name}</td>
            <td className='cart-table-cell'>
              <div className='cart-table-qty-container'>
                Oty:
                <input
                  className='cart-qty-input'
                  type='number'
                  value={itemQty}
                  onChange={handleQuantityChange}
                ></input>
                <button className='btn btn-success' onClick={updateQuantity}>
                  <img className='cart-btn-img' src={updateIcon} alt='update' />
                </button>
                <button className='btn btn-danger' onClick={deleteItem}>
                  <img className='cart-btn-img' src={deleteIcon} alt='delete' />
                </button>
              </div>
            </td>
            <td className='cart-table-cell'>{item.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
