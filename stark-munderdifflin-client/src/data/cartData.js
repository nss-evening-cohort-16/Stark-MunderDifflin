import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

const getPaperItemsByOrder = async () => {
  const items = await axios.get(`${dbURL}/Order/1`);
  return items.data;
};

export default getPaperItemsByOrder;
