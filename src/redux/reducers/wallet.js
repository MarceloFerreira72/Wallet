import { GET_CURRENCY_LIST } from '../actions';

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
  default:
    return state;
  }
}

export default walletReducer;
