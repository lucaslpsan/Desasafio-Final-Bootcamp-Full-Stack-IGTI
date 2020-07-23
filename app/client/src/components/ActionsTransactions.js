import React from 'react';

export default function ActionsTransactions({ id, type, onActionClick }) {
  const onActionClickHandle = () => {
    onActionClick(id, type);
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
