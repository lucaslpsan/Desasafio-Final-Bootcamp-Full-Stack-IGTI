export const dateFormat = (value) => {
  const retornos = value.split('-');
  switch (retornos[1]) {
    case '01':
      return 'Jan/' + retornos[0];
    case '02':
      return 'Fev/' + retornos[0];
    case '03':
      return 'Mar/' + retornos[0];
    case '04':
      return 'Abr/' + retornos[0];
    case '05':
      return 'Mai/' + retornos[0];
    case '06':
      return 'Jun/' + retornos[0];
    case '07':
      return 'Jul/' + retornos[0];
    case '08':
      return 'Ago/' + retornos[0];
    case '09':
      return 'Set/' + retornos[0];
    case '10':
      return 'Out/' + retornos[0];
    case '11':
      return 'Nov/' + retornos[0];
    default:
      return 'Dez/' + retornos[0];
  }
};

export const lastDayOfMonth = (date) => {
  const arrayDate = date.split('-');
  switch (arrayDate[1]) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      return date + '-31';
    case '02':
      //Verifica se o ano é bissexto
      if (
        arrayDate[1] % 4 === 0 &&
        arrayDate[1] % 400 === 0 &&
        arrayDate[1] % 100 === 0
      )
        return date + '-29';
      return date + '-28';
    default:
      return date + '-30';
  }
};
