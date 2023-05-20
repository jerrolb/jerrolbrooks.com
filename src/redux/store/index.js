import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import diceReducer from '../reducers/diceReducer';
import ticTacToeReducer from '../reducers/ticTacToeReducer';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage
};

const combinedReducers = combineReducers({
  dice: diceReducer,
  ticTacToe: ticTacToeReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
