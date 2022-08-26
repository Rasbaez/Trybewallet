// Coloque aqui suas actions
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_USER = 'ADD_USER';

export function addExpenseAction(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}

export function addUserAction(payload) {
  return {
    type: ADD_USER,
    email: payload,
  };
}

// export default { addExpenseAction, addUserAction };
