import React from "react"
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import Index from "../pages/Index/Index"

export default class MyRoute extends React.Component{
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Index}/>
        </Switch>
      </Router>
    )
  }
}