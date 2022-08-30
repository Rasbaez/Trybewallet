// Coloque aqui suas actions
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES_OK = 'GET_CURRENCIES_OK';

export function addExpenseAction(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
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

const getCurrenciesFailure = ({ message }) => {
  console.log(message);
};

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(URL);
      const data = await response.json();
      const currencies = Object.keys(data);
      const currenciesWithoutUSDT = currencies.filter((currency) => currency !== 'USDT');
      dispatch(getCurrencies(currenciesWithoutUSDT));
      return data;
    } catch (error) {
      // console.log(e.message);
      getCurrenciesFailure(error);
    }
  };
}
