// import actions from ../actions

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default walletReducer;
