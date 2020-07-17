import React from 'react';

export default function SelectDate({ dates, selectDate, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div>
      <select value={selectDate} onChange={handleChange}>
        {dates.map((date) => {
          return (
            <option key={date} value={date}>
              {date}
            </option>
          );
        })}
      </select>
    </div>
  );
}
