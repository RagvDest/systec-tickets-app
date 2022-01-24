import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import LogIn from './pages/LogIn';
import { selectUser } from './features/userSlice';
import Home from './pages/Home';
import React from 'react';
import { useSelector } from 'react-redux';



function App() {
  const user = useSelector(selectUser);
  return (
      <React.Fragment>
           {/* {user ? <Home user={user}/> : <LogIn/>} */}
           <Home user={'Renny Goro'}/>
      </React.Fragment>
  );
}

export default App;
