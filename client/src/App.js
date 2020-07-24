import React, { useState, useEffect } from 'react';
import { getAllTransactions, getAllPeriods } from './services/apiServices';
import Spinner from './components/Spinner';
import TransactionsControl from './components/TransactionsControl';
import SelectDate from './components/SelectDate';
import ResumeTransactions from './components/ResumeTransactions';
import ModalTransactions from './components/ModalTransactions';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectDate, setSelectDate] = useState('Escolha um período');
  const [dates, setDates] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentTrasaction, setCurrenTransaction] = useState('');

  useEffect(() => {
    (async () => {
      const dataTrasactions = await getAllTransactions(selectDate);

      dataTrasactions.data.sort((a, b) => a.day - b.day);

      setTransactions(dataTrasactions.data);
    })();
  }, [selectDate]);

  useEffect(() => {
    (async () => {
      const dataPeriods = await getAllPeriods();
      setDates(dataPeriods.data);
    })();
  }, []);

  const handleOnDelete = (id) => {
    console.log('handleOnDelete: ' + id);
    // let newTransactions = Object.assign([], transactions);

    const newTransactions = transactions.filter(
      (transaction) => transaction._id !== id
    );

    setTransactions(newTransactions);
  };
  const handleOnPersist = (transactionToPersist) => {
    console.log('handleOnPersist :' + transactionToPersist._id);
    setCurrenTransaction(transactionToPersist);
    setIsModelOpen(true);
  };
  const handleSelectDateChange = (chosenDate) => {
    setSelectDate(chosenDate);
  };

  const handleSaveTransaction = () => {};
  const handleClose = () => {
    setIsModelOpen(false);
  };

  console.log(transactions);
  console.log(dates);
  return (
    <div className="container center">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h2>Controle Financeiro Pessoal</h2>
      {!dates.length && <Spinner />}
      {dates.length && (
        <div>
          <SelectDate
            dates={dates}
            selectDate={selectDate}
            onChange={handleSelectDateChange}
          />
          <ResumeTransactions transactions={transactions} />
          <TransactionsControl
            transactions={transactions}
            onDelete={handleOnDelete}
            onPersist={handleOnPersist}
          />
        </div>
      )}
      {isModelOpen && (
        <ModalTransactions
          onSave={handleSaveTransaction}
          onClose={handleClose}
          transaction={currentTrasaction}
        />
      )}
    </div>
  );
}
