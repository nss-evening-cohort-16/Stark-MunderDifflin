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
  return res.data;
};

const closeCart = async () => {};

const updateOrderItemQuantity = async (orderItemId, quantity) => {
  await axios.put(`${dbURL}/Order/OrderItems/${orderItemId}`, {
    Quantity: quantity,
  });
};

export { getPaperItemsByOrder, updateOrderItemQuantity, getUserCart };
