import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserOrderTableRow({ order }) {
  const navigate = useNavigate();
  return (
    <tr className='user-order-row order-body'>
      <td className='user-order-cell order-body'>Order #: {order.id}</td>
      <td className='user-order-cell order-body'>
        <div className='btn-container'>
          <div>{order.isOpen ? 'Open' : 'Closed'}</div>
          <button
            className='view-order-btn'
            onClick={() => navigate(`/Order/${order.id}`)}
          >
            View Order
          </button>
        </div>
      </td>
    </tr>
  );
}
