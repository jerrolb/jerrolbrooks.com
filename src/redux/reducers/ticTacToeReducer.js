import {
  UPDATEXISNEXT,
  UPDATESQUARES,
  UPDATEHISTORY
} from '../actionTypes';

const initialState = {
  squares: Array(9).fill(null),
  history: [{ squares: Array(9).fill(null) }],
  xIsNext: true
};

function ticTacToeReducer (state = initialState, { type, payload }) {
  switch (type) {
  case UPDATEXISNEXT:
    return updateXIsNext(state, payload);
  case UPDATESQUARES:
    return updateSquares(state,payload);
  case UPDATEHISTORY:
    return updateHistory(state,payload);
  default:
    return state;
  }
}

function updateXIsNext(state, payload) {
  return {
    ...state,
    xIsNext: payload
  };
}

function updateSquares(state, payload) {
  return {
    ...state,
    squares: payload
  };
}

function updateHistory(state, payload) {
  return {
    ...state,
    history: payload
  };
}

export default ticTacToeReducer;
