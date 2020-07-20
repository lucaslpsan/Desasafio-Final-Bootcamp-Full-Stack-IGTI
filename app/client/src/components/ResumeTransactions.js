import React from 'react';
import css from './ResumeTransactions.module.css';

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
        Receitas: <span className={css.positive}>{sumPositive}</span>
      </div>
      <div>
        Despesas: <span className={css.negative}>{sumNegative}</span>
      </div>
      <div>Saldos: {sumPositive - sumNegative}</div>
    </div>
  );
}
