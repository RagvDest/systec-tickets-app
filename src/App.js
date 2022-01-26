import './App.css';
import { selectUser } from './features/userSlice';
import Home from './pages/Home';
import React from 'react';
import {Provider} from 'react-redux';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from './app/store';
import {Loading} from './components/LoadingComponent';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';



function App() {
  const user = useSelector(selectUser);
  return (
      <React.Fragment>
          <Provider store={store}>
            <PersistGate loading={<Loading/>} persistor={persistedStore}>
                <BrowserRouter>
                  <Main/>
                </BrowserRouter>
            </PersistGate>

          </Provider>
           {/* {user ? <Home user={user}/> : <LogIn/>} */}  
      </React.Fragment>
  );
}

export default App;
