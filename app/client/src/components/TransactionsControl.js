import React from 'react';

export default function TransactionsControl({
  transactions,
  onDelete,
  onPersist,
}) {
  return <div>{transactions.length}</div>;
}
