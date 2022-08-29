// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_OK } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,

};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES_OK:
    return {
      ...state,
      currencies: action.currencies,
    };
  default: return state;
  }
}

export default walletReducer;
