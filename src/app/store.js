import {createStore, combineReducers, applyMiddleware} from "redux";
import {createForms} from 'react-redux-form';
import userReducer from '../features/userSlice';
import searchUsersReducer from '../features/searchUsersSlice';
import pedidoReducer from '../features/pedidoSlice';
import pagReducer from '../features/pagSlice';
import appReducer from '../features/appSlice';
import dashReducer from '../features/dashboardSlice';
import ticketReducer from '../features/ticketSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialUserInfo} from "./Forms";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistenceConfigs = {
    key: 'rgvSystec', // whatever you want to keep as your key
    storage
};

const applicationReducer = combineReducers({
    user:userReducer,
    searchUser:searchUsersReducer,
    pedido:pedidoReducer,
    pag:pagReducer,
    app:appReducer,
    ticket:ticketReducer,
    dash:dashReducer,
    ...createForms({
        userInfo:InitialUserInfo
    })
});

const persistedReducer = persistReducer(persistenceConfigs, applicationReducer);

export const store = createStore(persistedReducer,
    applyMiddleware(thunk, logger));

export const persistedStore = persistStore(store);
