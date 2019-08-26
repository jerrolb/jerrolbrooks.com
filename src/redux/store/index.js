import { createStore, combineReducers } from 'redux';
import diceReducer from '../reducers/diceReducer';
import ticTacToeReducer from '../reducers/ticTacToeReducer';

const store = createStore(combineReducers({
    dice: diceReducer,
    ticTacToe: ticTacToeReducer
}));

export default store;
