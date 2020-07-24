import axios from 'axios';

const getAllTransactions = async (date) => {
  const data = await axios.get(
    `https://bootcamp-desafio-final.herokuapp.com/api/transaction?period=${date}`
  );

  return data.data;
};

const getAllPeriods = async () => {
  const data = await axios.get(
    `https://bootcamp-desafio-final.herokuapp.com/api/transaction/periods`
  );

  return data.data;
};

export { getAllTransactions, getAllPeriods };
