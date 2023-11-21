import React from 'react'
import { Loading } from '../LoadingComponent'
import SideBar from '../SideBar'

const MainHome = (props) => {
  return (
    <React.Fragment>
        <Loading/>
        <SideBar socket={props.socket}/>
    </React.Fragment>
  )
}

export default MainHome