import React from 'react';
import css from './TransactionsRender.module.css';
import MoneyFormat from '../helpers/MoneyFormat';
import ActionsTransactions from './ActionsTransactions';

export default function TransactionsRender({
  transactions,
  onDelete,
  onPersist,
}) {
  const onActionClickHandle = (transaction, action) => {
    // console.log('transaction ' + transaction + ' action: ' + action);
    if (action === 'delete') {
      onDelete(transaction._id);
    } else {
      onPersist(transaction);
    }
  };
  if (transactions.length)
    return (
      <div>
        {transactions.map((transaction) => {
          return (
            <div key={transaction._id} className={css.container}>
              <div className={css.day}>{transaction.day}</div>
              <div className={css.categoryAndDescription}>
                <div>{transaction.category}</div>
                <div>{transaction.description}</div>
              </div>
              <div className={css.value}>{MoneyFormat(transaction.value)}</div>
              <div className={css.actions}>
                <ActionsTransactions
                  chosenTransaction={transaction}
                  type="edit"
                  onActionClick={onActionClickHandle}
                />
                <ActionsTransactions
                  chosenTransaction={transaction}
                  type="delete"
                  onActionClick={onActionClickHandle}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  return <div>Nenhum lançamento encontrado</div>;
}
