import { CREATE_EXCHANGE, GET_STORE_DATA, GET_EXCHANGE } from 'actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_STORE_DATA: {
      const { payload: { exchanges: { exchanges_list, row_counter } } } = action;
      return { exchangesList: exchanges_list, rowCounter: row_counter };
    }
    case CREATE_EXCHANGE:
      return {
        exchangesList: [action.payload, ...state.exchangesList],
        rowCounter: state.rowCounter + 1,
      };
    case GET_EXCHANGE: {
      const exchangesList = [...state.exchangesList, ...action.payload];
      return { exchangesList, rowCounter: state.rowCounter };
    }
    default:
      return state;
  }
};
