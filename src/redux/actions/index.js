export const LOGIN = 'LOGIN';
export const GET_CURRENCY_LIST = 'GET_CURRENCY_LIST';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (value) => ({ type: LOGIN, value });
export const getCurrencyList = () => async (dispatch) => {
  const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(CURRENCY_BASE_API);
  const data = await response.json();
  const arrayList = Object.keys(data);
  arrayList.splice(1, 1);
  dispatch({
    type: GET_CURRENCY_LIST,
    currencies: arrayList,
  });
};
export const saveExpense = (value, currency) => async (dispatch) => {
  const ATUAL_PRICE_API = `https://economia.awesomeapi.com.br/${currency}-BRL/1`;
  const response = await fetch(ATUAL_PRICE_API);
  const data = await response.json();
  const { ask } = data[0];
  console.log(value);
  value[value.length - 1].conversion = ask;
  dispatch({
    type: SAVE_EXPENSE,
    expenses: [...value],
  });
};
