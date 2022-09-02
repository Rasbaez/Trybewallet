// Coloque aqui suas actions
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES_OK = 'GET_CURRENCIES_OK';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EXPENSE_TO_EDIT = 'EXPENSE_TO_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpenseAction = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const expenseToEdit = (idExpense) => ({
  type: EXPENSE_TO_EDIT,
  idExpense,
});

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const addUserAction = (user) => ({
  type: ADD_USER,
  user,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES_OK,
  currencies,
});

export function fetchAPI() {
  return async (dispatch) => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    const currencies = Object.keys(data);
    const currenciesWithoutUSDT = currencies.filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currenciesWithoutUSDT));
    return data;
  };
}
