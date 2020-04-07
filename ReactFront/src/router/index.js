import React from "react"
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom'
import ContextMain from '@/pages/ContextMain/ContextMain'
import Login from '@/pages/Login/Login'

export default class MyRoute extends React.Component{
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/contextmain" component={ContextMain}/>
          <Route path="/login" component={Login}/>
          <Redirect from="/" to="/contextmain"></Redirect>
        </Switch>
      </Router>
    )
  }
}