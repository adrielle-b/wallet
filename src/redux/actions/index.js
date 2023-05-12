// Coloque aqui suas actions
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const SAVE_WALLET = 'SAVE_WALLET';
export const FETCH_SUCESS = 'FETCH_SUCESS';

export const saveLogin = (login) => ({
  type: SAVE_LOGIN,
  payload: login,
});

export const saveWallet = (wallet) => ({
  type: SAVE_WALLET,
  payload: wallet,
});

export const fetchSucess = (currencies) => ({
  type: FETCH_SUCESS,
  payload: currencies,
}
);

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const listMoedas = Object.keys(data).filter((moeda) => moeda !== 'USDT');
    dispatch(fetchSucess(listMoedas));
  } catch (error) {
    console.log(error);
  }
};
