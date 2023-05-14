import { REQUEST_CURRENCIES, SAVE_WALLET } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE_WALLET = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case SAVE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      total: action.total,
    };

  default:
    return state;
  }
};

export default walletReducer;
