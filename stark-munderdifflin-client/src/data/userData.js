import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const userExistsInDB = async () => {
  const token = sessionStorage.getItem('idToken');
  await axios.get(`${dbUrl}/Customer/Auth`, {
    headers: { Authorization: 'Bearer ' + token, idToken: token },
  });
};

export default userExistsInDB;
