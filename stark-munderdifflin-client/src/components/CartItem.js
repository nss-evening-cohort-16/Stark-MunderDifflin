import React, { useState, useEffect } from 'react';
import getPaperItemsByOrder from '../data/cartData';

export default function CartItem({ item }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getPaperItemsByOrder(1).then((items) => {
      setCartItems(items);
      console.log(items);
    });
  }, []);

  return (
    <div>
      <table className='cart-table'>
        <thead>
          <tr className='cart-table-row'>
            <td className='cart-table-cell'></td>
            <td className='cart-table-cell'>Name</td>
            <td className='cart-table-cell'>Quantity</td>
            <td className='cart-table-cell'>Price</td>
          </tr>
        </thead>
        <tbody>
          <tr className='cart-table-row'>
            <td className='cart-table-cell'>
              <img src={item.ImageUrl} alt='paper'></img>
            </td>
            <td className='cart-table-cell'>{item.Name}</td>
            <td className='cart-table-cell'>{item.Quantity}</td>
            <td className='cart-table-cell'>{item.Price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
