// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES_OK,
  ADD_EXPENSE, DELETE_EXPENSE,
  EXPENSE_TO_EDIT,
  EDIT_EXPENSE,
} from '../actions';

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
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case EXPENSE_TO_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.idExpense,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .map((exp) => (
          exp.id === state.idToEdit
            ? ({ ...exp, ...action.expense }) : ({ ...exp })
        ))],
    };
  default: return state;
  }
}

export default walletReducer;
