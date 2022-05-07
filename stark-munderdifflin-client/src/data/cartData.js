import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

const getPaperItemsByOrder = async () => {
  const items = await axios.get(`${dbURL}/Order/7`);
  return items.data;
};

const updateOrderItemQuantity = async (orderItemId, quantity) => {
  await axios.put(`${dbURL}/Order/OrderItems/${orderItemId}`, {
    Quantity: quantity,
  });
};

export { getPaperItemsByOrder, updateOrderItemQuantity };
