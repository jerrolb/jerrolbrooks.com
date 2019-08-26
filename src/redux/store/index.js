import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import diceReducer from '../reducers/diceReducer';
import ticTacToeReducer from '../reducers/ticTacToeReducer';

const persistConfig = {
    key: 'root',
    storage
};

const combinedReducers = combineReducers({
    dice: diceReducer,
    ticTacToe: ticTacToeReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
