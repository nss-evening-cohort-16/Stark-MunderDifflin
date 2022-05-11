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
  try {
    const res = await axios.get(`${dbURL}/Order/Cart`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates quantity of a cart item.
 * @async PUT
 * @param {string} orderItemId - id of item
 * @param {string} quantity - new quantity of item
 * @return {void}
 */
const updateOrderItemQuantity = async (orderItemId, quantity) => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.put(
      `${dbURL}/Order/OrderItems/${orderItemId}`,
      {
        Quantity: quantity,
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * Adds an item to user's current cart.
 * @async POST
 * @param {Object} paper - paper object including id and quantity
 * @return {void}
 */
//orderId is updated with sending user's current open orderId
const addToCart = async (paper) => {
  const token = sessionStorage.getItem('idToken');
  const paperToAdd = {
    PaperId: paper.paperId,
    Quantity: paper.quantity,
  };

  try {
    await axios.post(`${dbURL}/Order/Add`, paperToAdd, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Deletes an item from user's current cart.
 * @async DELETE
 * @param {int} id - order item id
 * @return {void}
 */
const deleteCartItem = async (id) => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.delete(`${dbURL}/Order/DeleteCartItem/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (error) {
    console.error(error);
  }
};

const closeOrder = async (cartId) => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.get(`${dbURL}/Order/Close/${cartId}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  updateOrderItemQuantity,
  getUserCart,
  addToCart,
  deleteCartItem,
  closeOrder,
};
