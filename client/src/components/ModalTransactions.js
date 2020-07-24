import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransactions({ onSalve, onClose, transaction }) {
  const [transactionEdited, setTransactionEdited] = useState(transaction);
  const newTransaction = Object.assign([], setTransactionEdited);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose(null);
  };

  const handleChangeType = (event) => {
    newTransaction.type = event.target.value === 'despesa' ? '-' : '+';
    setTransactionEdited(newTransaction);
    // console.log(event.target);
  };

  const handleValueChange = (event) => {
    newTransaction.value = event.target.value;

    setTransactionEdited(newTransaction);
  };

  return (
    <Modal isOpen={true}>
      <p>
        <label>
          <input
            // id="inputRadioDespesa"
            radioGroup="groupType"
            type="radio"
            name="group"
            checked={transactionEdited.type === '-'}
            value="despesa"
            onChange={handleChangeType}
          />
          <span>Despesa</span>
        </label>
        <label>
          <input
            // id="inputRadioReceita"
            radioGroup="groupType"
            type="radio"
            name="group"
            checked={transactionEdited.type === '+'}
            value="receita"
            onChange={handleChangeType}
          />
          <span>Receita</span>
        </label>
      </p>
      <div className="input-field">
        <input
          id="inputDescription"
          type="text"
          value={transaction.description}
        />
        <label className="active" htmlFor="inputDescription">
          Descrição:
        </label>
      </div>
      <div className="input-field">
        <input id="inputCategory" type="text" value={transaction.category} />
        <label className="active" htmlFor="inputCategory">
          Categoria:
        </label>
      </div>
      <div className="input-field">
        <input
          id="inputValue"
          type="number"
          value={transactionEdited.value}
          onChange={handleValueChange}
        />
        <label className="active" htmlFor="inputValue">
          Valor:
        </label>
      </div>
    </Modal>
  );
}
