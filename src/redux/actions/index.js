// Coloque aqui suas actions
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_USER = 'ADD_USER';

export function addExpenseAction(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}

export const addUserAction = (payload) => ({
  type: ADD_USER,
  payload,
});

// export default { addExpenseAction, addUserAction };
