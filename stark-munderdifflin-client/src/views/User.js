import React, { useState, useEffect } from 'react';
import { getAllUserOrders } from '../data/userData';
import UserOrderTableRow from '../components/UserOrderTableRow';

export default function User({ user }) {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    getAllUserOrders().then((userOrders) => {
      setUserOrders(userOrders);
    });
  }, []);

  return (
    <div className='user-container'>
      {user ? (
        <h3>
          {user.fullName} &#40;{user.username}&#41;
        </h3>
      ) : (
        ''
      )}
      <div className='user-order-container'>
        <table className='user-order-table'>
          <thead className='user-order-header'>
            <tr className='user-order-row order-head'>
              <th className='user-order-cell order-head' colSpan='2'>
                Orders
              </th>
            </tr>
          </thead>
          <tbody className='user-order-body'>
            <>
              {userOrders
                ? userOrders.map((order) => (
                    <UserOrderTableRow key={order.id} order={order} />
                  ))
                : ''}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}
