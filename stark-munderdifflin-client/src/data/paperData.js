import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getAllPapers = async () => {
    const paper = await axios.get(`${dbUrl}/Paper`)
    const paperData = paper.data;
    return paperData;
  };

const getPaperById = async (paperId) => {
    const paperArray = await axios.get(`${dbUrl}/Paper/${paperId}`)
    .then((response) => response.data);
    return paperArray;
}



export {getPaperById,getAllPapers } ;
