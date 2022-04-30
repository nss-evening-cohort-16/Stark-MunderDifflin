import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getAllPapers = async () => {
  const token = sessionStorage.getItem('idToken');
  const paper = await axios.get(`${dbUrl}/Paper`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  const paperData = paper.data;
  return paperData;
};

const getPaperById = async (paperId) => {
  const paperArray = await axios.get(`${dbUrl}/Paper/${paperId}`);
  const paperData = paperArray.data;
  return paperData;
};

const createPaper = (paperObj) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${dbUrl}/Paper`, paperObj)
      .then((response) => {
        if (response.status > 300 || response.status < 200) {
          throw new Error(response.status);
        } else {
          resolve();
        }
      })
      .catch(reject);
  });

export { getPaperById, getAllPapers, createPaper };
