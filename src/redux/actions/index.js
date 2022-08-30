export const LOGIN = 'LOGIN';
export const GET_CURRENCY_LIST = 'GET_CURRENCY_LIST';

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
