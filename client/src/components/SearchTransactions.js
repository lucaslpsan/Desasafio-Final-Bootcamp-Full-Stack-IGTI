import React from 'react';

export default function SearchTransactions({ onChange, disabledSearch }) {
  const handleOnChange = (event) => {
    onChange(event.target.value.toLowerCase());
  };
  return (
    <div style={style.searchBox}>
      <input type="text" onInput={handleOnChange} disabled={disabledSearch} />
      <span className="material-icons">search</span>
    </div>
  );
}

const style = {
  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
};
