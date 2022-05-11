import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

/**
 * Retrieves array of all paper objects in database
 * @async GET
 * @return {Array} ArrayOfPaperObjects
 */
const getAllPapers = async () => {
  const token = sessionStorage.getItem('idToken');
  const paper = await axios.get(`${dbUrl}/Paper`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  const paperData = paper.data;
  return paperData;
};

/**
 * Retrieves paper object by id.
 * @async GET
 * @param {int} paperId - id of item
 * @return {object} paperObject
 */
const getPaperById = async (paperId) => {
  const paperArray = await axios.get(`${dbUrl}/Paper/${paperId}`);
  const paperData = paperArray.data;
  return paperData;
};

/**
 * Creates a new paper object in database.
 * @async POST
 * @param {object} paperObj
 * @return {void}
 */
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

/**
 * Updates a paper object in database.
 * @async PUT
 * @param {int} id - paper id
 * @param {object} paperObj
 * @return {void}
 */
const updatePaper = (id, paperObj) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${dbUrl}/Paper/Edit/${id}`, paperObj)
      .then(() => getAllPapers().then(resolve))
      .catch(reject);
  });

/**
 * Deletes a paper object in database.
 * @async DELETE
 * @param {int} paperId
 * @return {void}
 */
const deletePaper = (paperId) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbUrl}/Paper/Delete/${paperId}`)
      .then(() => getAllPapers().then(resolve))
      .catch(reject);
  });
export { getPaperById, getAllPapers, createPaper, updatePaper, deletePaper };
