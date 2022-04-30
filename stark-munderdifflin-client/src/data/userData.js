import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const userExistsInDB = async (token) => {
  axios.post(`${dbUrl}/Customer`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default userExistsInDB;
