// Coloque aqui suas actions
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const SAVE_WALLET = 'SAVE_WALLET';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_EXCHANGE = 'REQUEST_EXCHANGE';
export const EXCLUIR_EXPENSE = 'EXCLUIR_EXPENSE';
export const HABILITA_EDIT = 'HABILITA_EDIT';
export const SAVE_EDIT = 'SAVE_EDIT';

export const saveLogin = (login) => ({
  type: SAVE_LOGIN,
  payload: login,
});

export const saveWallet = (wallet) => ({
  type: SAVE_WALLET,
  payload: wallet,
});

export const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  payload: currencies,
}
);

export const excluirExpense = (walletAtual) => ({
  type: EXCLUIR_EXPENSE,
  payload: walletAtual,
});

export const habilitaEdit = (id) => ({
  type: HABILITA_EDIT,
  payload: id,
});

export const saveEdit = (expenses) => ({
  type: SAVE_EDIT,
  payload: expenses,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const listMoedas = Object.keys(data).filter((moeda) => moeda !== 'USDT');
    dispatch(requestCurrencies(listMoedas));
  } catch (error) {
    console.log(error);
  }
};

export const fetchExchange = (expenses) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    // console.log(data);
    const expense = { ...expenses, exchangeRates: { ...data } };
    dispatch(saveWallet(expense));
  } catch (error) {
    console.log(error);
  }
};
