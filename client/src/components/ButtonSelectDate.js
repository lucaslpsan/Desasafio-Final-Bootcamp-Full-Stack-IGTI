import React from 'react';

export default function ButtonSelectDate({
  direction,
  dates,
  selectDate,
  onClick,
}) {
  //Localiza no array de dates qual a posição da data atual
  const currentIndex = dates.findIndex((date) => date === selectDate);
  //Guarda a direção como um boolean, true => proxíma data ou false => data anterior
  const directionBoolean = direction === 'next';

  const onClickButton = () => {
    //Seleciona a data anterior ou posterior conforme a direção do botão
    onClick(
      directionBoolean ? dates[currentIndex + 1] : dates[currentIndex - 1]
    );
  };
  return (
    <button
      className="waves-lights btn"
      style={style.button}
      onClick={onClickButton}
      disabled={
        //Se for a primeira data (Selecione um período), então o botão disabilita
        (!directionBoolean && currentIndex === -1) ||
        //Se for a última data, então o botão desabilita também
        (directionBoolean && currentIndex === dates.length - 1)
      }
    >
      {directionBoolean ? '>' : '<'}
    </button>
  );
}
const style = {
  button: {
    margin: '0 10px 0 10px',
  },
};
