import axios from 'axios';
import 'dotenv/config.js';

//Conexão com a API
const LINK_API = process.env.REACT_APP_LINK_API;

export const getAllTransactions = async (date) => {
  const data = await axios.get(`${LINK_API}?period=${date}`);

  return data.data;
};

export const getAllPeriods = async () => {
  console.log(LINK_API);
  const data = await axios.get(`${LINK_API}/periods`);

  return data.data;
};

export const updateTransaction = async (transaction) => {
  const response = await axios.put(`${LINK_API}/${transaction._id}`, {
    ...transaction,
  });

  return response;
};

export const createTransaction = async (transaction) => {
  const response = await axios.post(LINK_API, {
    ...transaction,
  });

  return response;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${LINK_API}/${id}`);
};
