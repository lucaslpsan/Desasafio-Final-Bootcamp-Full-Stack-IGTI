import React, { useState, useEffect } from 'react';
import {
  getAllTransactions,
  getAllPeriods,
  updateTransaction,
  createTransaction,
  deleteTransaction,
} from './services/apiServices';
import Spinner from './components/Spinner';
import TransactionsRender from './components/TransactionsRender';
import SelectDate from './components/SelectDate';
import ResumeTransactions from './components/ResumeTransactions';
import ModalTransactions from './components/ModalTransactions';
import { lastDayOfMonth } from './helpers/DateFormat';
import SearchTransactions from './components/SearchTransactions';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectDate, setSelectDate] = useState('Escolha um período');
  const [dates, setDates] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentTrasaction, setCurrentTransaction] = useState('');
  const [responseAPI, setResponseAPI] = useState('');
  const [transactionsOriginal, setTransactionsOriginal] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => {
      const dataTrasactions = await getAllTransactions(selectDate);

      dataTrasactions.data.sort((a, b) => a.day - b.day);

      setTransactionsOriginal(dataTrasactions.data);
      // setTransactions(searchTransaction());
      setTransactions(dataTrasactions.data);
    })();
  }, [selectDate, responseAPI]);

  useEffect(() => {
    (async () => {
      const datePeriods = await getAllPeriods();
      setDates(datePeriods.data);
    })();
  }, []);

  useEffect(() => {
    if (selectDate !== 'Escolha um período')
      setTransactions(searchTransaction());
  }, [searchText]);

  //Prop da TransactionsRender, ícone delete
  const handleOnDelete = async (id) => {
    console.log('handleOnDelete: ' + id);

    // const newTransactions = transactions.filter(
    //   (transaction) => transaction._id !== id
    // );

    // setTransactions(newTransactions);

    setResponseAPI(await deleteTransaction(id));
    console.log('Via update ', responseAPI);
  };

  //Prop da TransactionsRender, ícone edit
  const handleOnPersist = (transactionToPersist) => {
    console.log('handleOnPersist :' + transactionToPersist._id);
    //Seta a currentTransaction para a modal editar
    setCurrentTransaction(transactionToPersist);
    setIsModelOpen(true);
  };

  const handleSelectDateChange = (chosenDate) => {
    setSelectDate(chosenDate);
  };

  const handleSaveTransaction = async (transactionToSave) => {
    console.log(transactionToSave);
    let editedTransaction = transactions.find(
      (transaction) => transaction._id === transactionToSave._id
    );

    //Se o lançamento existir, então atualiza
    if (editedTransaction) {
      setResponseAPI(await updateTransaction(transactionToSave));
      console.log('Via update ', responseAPI);
    } else {
      setResponseAPI(await createTransaction(transactionToSave));
      console.log('Via create ', responseAPI);
    }

    // console.log(editedTransaction);
    setIsModelOpen(false);
  };

  const handleOnSearch = (search) => {
    setSearchText(search);
    // setTransactions(searchTransaction(search));
  };

  const searchTransaction = () => {
    if (searchText !== '') {
      const searchTransactions = transactionsOriginal.filter((transaction) => {
        return transaction.description.toLowerCase().indexOf(searchText) > -1;
      });
      if (searchTransactions.length) return searchTransactions;
      return [];
    }

    return transactionsOriginal;
  };

  const handleClose = () => {
    setIsModelOpen(false);
  };

  const handleClickNewTransaction = () => {
    setCurrentTransaction([]);
    setIsModelOpen(true);
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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button
              className="waves-lights btn"
              onClick={handleClickNewTransaction}
            >
              Novo lançamento
            </button>
            <SearchTransactions
              onChange={handleOnSearch}
              disabledSearch={selectDate === 'Escolha um período'}
            />
          </div>
          <TransactionsRender
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
          datesLimits={{
            start: dates[0] + '-01',
            end: lastDayOfMonth(dates[dates.length - 1]),
          }}
        />
      )}
    </div>
  );
}
