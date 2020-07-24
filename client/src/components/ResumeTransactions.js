import React from 'react';
import css from './ResumeTransactions.module.css';
import MoneyFormat from '../helpers/MoneyFormat';

export default function ResumeTransactions({ transactions }) {
  const sumPositive = transactions.reduce((acc, curr) => {
    if (curr.type === '+') return curr.value + acc;
    return acc;
  }, 0);
  const sumNegative = transactions.reduce((acc, curr) => {
    if (curr.type === '-') return curr.value + acc;
    return acc;
  }, 0);
  return (
    <div className={css.container}>
      <div>Lançamentos: {transactions.length}</div>
      <div>
        Receitas:{' '}
        <span className={css.positive}>{MoneyFormat(sumPositive)}</span>
      </div>
      <div>
        Despesas:{' '}
        <span className={css.negative}>{MoneyFormat(sumNegative)}</span>
      </div>
      <div>Saldos: {MoneyFormat(sumPositive - sumNegative)}</div>
    </div>
  );
}
