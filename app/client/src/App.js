import React, { useState, useEffect } from 'react';
import { getAllTransactions, getAllPeriods } from './services/apiServices';
import Spinner from './components/Spinner';
import TransactionsControl from './components/TransactionsControl';
import SelectDate from './components/SelectDate';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectDate, setSelectDate] = useState('2020-06');
  const [dates, setDates] = useState([]);

  useEffect(() => {
    (async () => {
      const dataTrasactions = await getAllTransactions(selectDate);
      setTransactions(dataTrasactions.data);
    })();
  }, [selectDate]);

  useEffect(() => {
    (async () => {
      const dataPeriods = await getAllPeriods();
      setDates(dataPeriods.data);
    })();
  }, []);

  const handleOnDelete = () => {
    console.log('handleOnDelete');
  };
  const handleOnPersist = () => {
    console.log('handleOnPersist');
  };
  const handleSelectDateChange = (chosenDate) => {
    setSelectDate(chosenDate);
  };

  console.log(transactions);
  console.log(dates);
  return (
    <div className="container center">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h2>Controle Financeiro Pessoal</h2>
      <SelectDate
        dates={dates}
        selectDate={selectDate}
        onChange={handleSelectDateChange}
      />
      {!transactions && <Spinner />}
      {transactions && (
        <TransactionsControl
          transactions={transactions}
          onDelete={handleOnDelete}
          onPersist={handleOnPersist}
        />
      )}
    </div>
  );
}
