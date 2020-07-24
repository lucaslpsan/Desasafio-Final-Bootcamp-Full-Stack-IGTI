import axios from 'axios';

const getAllTransactions = async (date) => {
  const data = await axios.get(
    `http://localhost:3001/api/transaction?period=${date}`
  );

  return data.data;
};

const getAllPeriods = async () => {
  const data = await axios.get(`http://localhost:3001/api/transaction/periods`);

  return data.data;
};

export { getAllTransactions, getAllPeriods };
