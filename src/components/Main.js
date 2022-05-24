
import React, { Component, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate} from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { addUsuario, getUsuarios } from '../features/searchUsersSlice';
import Home from '../pages/Home';
import {connect, useSelector} from 'react-redux';
import LogIn from '../pages/LogIn';
import PasswordModal from './Login/PasswordModal';



const mapStateToProps = state => {
    return {
        user:state.user.user
    };
};

function RequireAuth({ children, redirectTo, user }) {
    debugger;
    let isAuthenticated = user!=null;
    return isAuthenticated ? children[0] : children[1];
}

const Main = (props) =>{

      return(
      <div>
          <TransitionGroup>
                    <CSSTransition key='1234' classNames="page" timeout={300}>
                        <Routes>
                            <Route path='login' element={<LogIn/>}/>
                            <Route path='generate-pass/:idUser/:hashPassword' element={<PasswordModal mode='c' />}/>
                            <Route path='recover-pass' element={<PasswordModal mode='u' />}/>
                            
                            <Route path='*' element={
                                <RequireAuth redirectTo="" user={props.user}>
                                    <Home user={props.user}/>
                                    <LogIn/>
                                </RequireAuth>
                            }/>
                            
                        </Routes>
                    </CSSTransition>
            </TransitionGroup>
      </div>
      )
}

export default connect(mapStateToProps)(Main);
