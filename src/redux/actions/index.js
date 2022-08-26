// Coloque aqui suas actions
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_USER = 'ADD_USER';

function addExpenseAction(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}

function addUserAction(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export default { addExpenseAction, addUserAction };
