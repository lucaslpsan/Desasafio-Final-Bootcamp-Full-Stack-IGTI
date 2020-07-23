import React from 'react';
import css from './TransactionsControl.module.css';
import MoneyFormat from '../helpers/MoneyFormat';
import ActionsTransactions from './ActionsTransactions';

export default function TransactionsControl({
  transactions,
  onDelete,
  onPersist,
}) {
  const onActionClickHandle = (id, action) => {
    // console.log('id ' + id + ' action: ' + action);
    if (action === 'delete') onDelete(id);
  };
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
                id={transaction._id}
                type="edit"
                onActionClick={onActionClickHandle}
              />
              <ActionsTransactions
                id={transaction._id}
                type="delete"
                onActionClick={onActionClickHandle}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
