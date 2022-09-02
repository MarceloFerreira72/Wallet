import { GET_CURRENCY_LIST, SAVE_EXPENSE, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCY_LIST:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.value),
    };
  default:
    return state;
  }
}

export default walletReducer;
