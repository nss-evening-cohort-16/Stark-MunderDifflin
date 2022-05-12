import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserOrderItems } from '../data/userData';
import UserOrderItem from '../components/UserOrderItem';

export default function UserOrder() {
  const [orderItems, setOrderItems] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    getUserOrderItems(orderId).then((items) => setOrderItems(items));
  }, []);

  return (
    <div className='user-order-container'>
      {orderItems
        ? orderItems.map((orderItem) => (
            <UserOrderItem key={orderItem.id} item={orderItem} />
          ))
        : ''}
    </div>
  );
}
