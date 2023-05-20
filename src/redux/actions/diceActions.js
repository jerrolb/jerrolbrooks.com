import {
  UPDATEN,
  UPDATEMOD,
  UPDATELOG
} from '../actionTypes';

export function updateN(payload) {
  return {
    type: UPDATEN,
    payload
  };
}

export function updateMod(payload) {
  return {
    type: UPDATEMOD,
    payload
  };
}

export function updateLog(payload) {
  return {
    type: UPDATELOG,
    payload
  };
}
