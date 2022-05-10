import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

const getPaperItemsByOrder = async (id) => {
  const items = await axios.get(`${dbURL}/Order/${id}`);
  return items.data;
};

const getUserCart = async () => {
  const token = sessionStorage.getItem('idToken');
  const res = await axios.get(`${dbURL}/Order/Cart`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  console.log(res.data);
  return res.data;
};

const closeCart = async () => {};

const updateOrderItemQuantity = async (orderItemId, quantity) => {
  await axios.put(`${dbURL}/Order/OrderItems/${orderItemId}`, {
    Quantity: quantity,
  });
};

const addToCart = async (paper) => {
  console.log(paper);
  const token = sessionStorage.getItem('idToken');
  await axios.post(
    `${dbURL}/Order/Add/`,
    {
      PaperId: paper.id,
      Quantity: paper.quantity,
      orderId: 0,
    },
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};

export {
  getPaperItemsByOrder,
  updateOrderItemQuantity,
  getUserCart,
  addToCart,
};
