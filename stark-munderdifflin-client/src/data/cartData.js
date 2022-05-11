import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

/**
 * Returns user cart object.
 * @async GET
 * @
 * @param {string} id - id of user
 * @return {Object} cart
 */
const getUserCart = async () => {
  const token = sessionStorage.getItem('idToken');
  const res = await axios.get(`${dbURL}/Order/Cart`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return res.data;
};

//const closeCart = async () => {};

/**
 * Updates quantity of a cart item.
 * @async PUT
 * @param {string} orderItemId - id of item
 * @param {string} quantity - new quantity of item
 * @return {void}
 */
const updateOrderItemQuantity = async (orderItemId, quantity) => {
  await axios.put(`${dbURL}/Order/OrderItems/${orderItemId}`, {
    Quantity: quantity,
  });
};

/**
 * Adds an item to user's current cart.
 * @async POST
 * @param {Object} paper - paper object including id and quantity
 * @return {void}
 */
//orderId is updated with sending user's current open orderId
const addToCart = async (paper) => {
  console.log(paper);
  const token = sessionStorage.getItem('idToken');
  console.log(paper.paperId);
  const paperToAdd = {
    id: 0,
    OrderId: 0,
    PaperId: paper.id,
    Quantity: paper.quantity,
  };
  await axios.post(`${dbURL}/Order/Add`, paperToAdd, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export { updateOrderItemQuantity, getUserCart, addToCart };
