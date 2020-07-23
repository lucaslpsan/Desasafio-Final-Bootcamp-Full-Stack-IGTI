const moneyFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default (value) => {
  return moneyFormat.format(value);
};
