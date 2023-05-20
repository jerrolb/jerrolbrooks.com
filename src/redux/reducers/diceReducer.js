import {
  UPDATEN,
  UPDATEMOD,
  UPDATELOG
} from '../actionTypes';

const initialState = {
  log: '',
  n: 1,
  mod: 0
};

function diceReducer (state = initialState, { type, payload }) {
  switch (type) {
  case UPDATEN:
    return updateN(state, payload);
  case UPDATEMOD:
    return updateMod(state,payload);
  case UPDATELOG:
    return updateLog(state, payload);
  default:
    return state;
  }
}

function updateN(state, payload) {
  return {
    ...state,
    n: payload
  };
}

function updateMod(state, payload) {
  return {
    ...state,
    mod: payload
  };
}

function updateLog(state, payload) {
  return {
    ...state,
    log: payload
  };
}

export default diceReducer;
