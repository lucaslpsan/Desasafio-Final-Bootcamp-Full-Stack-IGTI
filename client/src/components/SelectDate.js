import React from 'react';
import { dateFormat } from '../helpers/DateFormat';

export default function SelectDate({ dates, selectDate, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
    // console.log(event.target.value);
  };
  return (
    <div>
      <select
        className={'browser-default custom-select'}
        style={style.boxSelect}
        value={selectDate}
        onChange={handleChange}
      >
        <option>Escolha um período</option>
        {dates.map((date) => {
          return (
            <option key={date} value={date}>
              {dateFormat(date)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const style = {
  boxSelect: {
    borderRadius: '5px',
  },
};
