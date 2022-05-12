import React from 'react';

export default function UserOrderItem({ item }) {
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
            <td className='cart-table-cell'>Oty: {item.quantity}</td>
            <td className='cart-table-cell'>{item.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
