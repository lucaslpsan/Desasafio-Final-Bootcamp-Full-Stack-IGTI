import React from 'react';

export default function ActionsTransactions({
  chosenTransaction,
  type,
  onActionClick,
}) {
  const onActionClickHandle = () => {
    onActionClick(chosenTransaction, type);
  };
  return (
    <span
      className="material-icons"
      style={{ cursor: 'pointer' }}
      onClick={onActionClickHandle}
    >
      {type}
    </span>
  );
}
