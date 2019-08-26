import {
    UPDATEXISNEXT,
    UPDATESQUARES,
    UPDATEHISTORY
} from '../actionTypes';

export function updateXIsNext(payload) {
    return {
        type: UPDATEXISNEXT,
        payload
    };
}

export function updateSquares(payload) {
    return {
        type: UPDATESQUARES,
        payload
    };
}

export function updateHistory(payload) {
    return {
        type: UPDATEHISTORY,
        payload
    };
}
