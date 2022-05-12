import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

/**
 * Checks if user exists on login using token, and creates user if not.
 * @async GET
 * @return {void}
 */
const userExistsInDB = async () => {
  const token = sessionStorage.getItem('idToken');
  await axios.get(`${dbURL}/Customer/Auth`, {
    headers: { Authorization: 'Bearer ' + token, idToken: token },
  });
};

/**
 * Retrieves all user orders.
 * @async GET
 * @return {Array} Array-Order Objects
 */
const getAllUserOrders = async () => {
  const token = sessionStorage.getItem('idToken');
  try {
    const res = await axios.get(`${dbURL}/Order/Customer`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getUserOrderItems = async (id) => {
  const token = sessionStorage.getItem('idToken');
  try {
    const res = await axios.get(`${dbURL}/Order/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { userExistsInDB, getAllUserOrders, getUserOrderItems };
