export const LOGIN = 'LOGIN';
export const GET_CURRENCY_LIST = 'GET_CURRENCY_LIST';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

const BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export const login = (value) => ({ type: LOGIN, value });
export const getCurrencyList = () => async (dispatch) => {
  const response = await fetch(BASE_API);
  const data = await response.json();
  const arrayList = Object.keys(data);
  const correctArray = arrayList.filter((element) => element !== 'USDT');
  dispatch({
    type: GET_CURRENCY_LIST,
    currencies: correctArray,
  });
};
export const saveExpense = (expense) => async (dispatch) => {
  const response = await fetch(BASE_API);
  const data = await response.json();
  const payload = { ...expense, exchangeRates: data };
  dispatch({
    type: SAVE_EXPENSE,
    expenses: payload,
  });
};
