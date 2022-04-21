import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;
const getAllPapers = async (paperId) => {
    const paperArray = await axios.get(`${dbUrl}/Paper`)
    .then((response) => response.data);
    return paperArray;
}

const getPaperById = async (paperId) => {
    const paperArray = await axios.get(`${dbUrl}/Paper/${paperId}`)
    .then((response) => response.data);
    return paperArray;
}



export {getPaperById,getAllPapers } ;