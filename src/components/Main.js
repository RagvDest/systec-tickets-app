
import React, { Component } from 'react';
import { Navigate, Route, Routes, useLocation} from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { addUsuario, getUsuarios } from '../features/searchUsersSlice';
import Home from '../pages/Home';
import {connect, useSelector} from 'react-redux';
import LogIn from '../pages/LogIn';



const mapStateToProps = state => {
    return {
        user:state.user.user
    };
};

function RequireAuth({ children, redirectTo, user }) {
    let isAuthenticated = user!=null;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

const Main = (props) =>{
      return(
      <div>
          <TransitionGroup>
                    <CSSTransition key='1234' classNames="page" timeout={300}>
                        <Routes>
                            <Route path="/login" element={<LogIn/>}/>
                            <Route path='/' element={
                                <RequireAuth redirectTo="/login" user={props.user}>
                                    <Home user={props.user}/>
                                </RequireAuth>
                            }/>
                            <Route path="/users" element={<Home user={props.user}/>}/>
                        </Routes>
                    </CSSTransition>
            </TransitionGroup>
      </div>
      )
}

export default connect(mapStateToProps)(Main);
