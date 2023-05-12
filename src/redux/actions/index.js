// Coloque aqui suas actions
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const SAVE_WALLET = 'SAVE_WALLET';

export const saveLogin = (login) => ({
  type: SAVE_LOGIN,
  payload: login,
});

export const saveWallet = (wallet) => ({
  type: SAVE_WALLET,
  payload: wallet,
});
