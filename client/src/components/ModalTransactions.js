import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from './ModalTransactions.module.css';

Modal.setAppElement('#root');

export default function ModalTransactions({
  onSave,
  onClose,
  transaction,
  datesLimits,
}) {
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);
  const [description, setDescription] = useState(transaction.description);
  const [value, setValue] = useState(transaction.value);
  const [date, setDate] = useState(transaction.yearMonthDay);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose(null);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleSubmitSave = (event) => {
    event.preventDefault();

    const formData = {
      id: transaction._id,
      value: value,
    };

    onSave(formData);
  };

  const handleChangeType = (event) => {
    setType(event.target.value === 'despesa' ? '-' : '+');
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(+event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    if (date > datesLimits.end || date < datesLimits.start) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [date, datesLimits]);

  return (
    <Modal isOpen={true}>
      <div className={css.flexRow}>
        <span>Edição do lançamento</span>
        <button
          className="waves-effect waves-lights btn red dark-4"
          onClick={handleModalClose}
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmitSave}>
        <p>
          <label>
            <input
              // id="inputRadioDespesa"
              radioGroup="groupType"
              type="radio"
              name="group"
              checked={type === '-'}
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
              checked={type === '+'}
              value="receita"
              onChange={handleChangeType}
            />
            <span>Receita</span>
          </label>
        </p>
        <div className="input-field">
          <input
            id="inputCategory"
            type="text"
            value={category || ''}
            onChange={handleCategoryChange}
          />
          <label className="active" htmlFor="inputCategory">
            Categoria:
          </label>
        </div>
        <div className="input-field">
          <input
            id="inputDescription"
            type="text"
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <label className="active" htmlFor="inputDescription">
            Descrição:
          </label>
        </div>
        <div className="input-field">
          <input
            id="inputValue"
            type="number"
            value={value || ''}
            onChange={handleValueChange}
          />
          <label className="active" htmlFor="inputValue">
            Valor:
          </label>
        </div>
        <div>
          <input
            type="date"
            className="datepicker"
            value={date}
            onChange={handleDateChange}
            min={datesLimits.start}
            max={datesLimits.end}
          />
        </div>
        <div>
          <button
            className="waves-effects waves-lights btn"
            disabled={disabledButton}
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
