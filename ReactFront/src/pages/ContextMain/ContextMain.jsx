import React from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import PageMenu from '@/components/PageMenu/PageMenu'
import Index from '@/pages/Index/Index'
import About from '@/pages/About/About'
import Err404 from '@/pages/Err404'
const { Sider, Content } = Layout


export default class ContextMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  handelCollapsed = newCollapsed => {
    console.log(newCollapsed)
    this.setState({ collapsed: newCollapsed })
  }
  render() {
    return (
      <Layout className="co_page">
        <Sider 
        collapsed={this.state.collapsed} 
        className="co_sider">
          <PageMenu 
          collapsed={this.state.collapsed}
          handelCollapsed={this.handelCollapsed}/></Sider>
        <Content className="co_content">
          <Router>
            <Switch>
              <Route path="/contextmain/index" component={Index}></Route>
              <Route path="/contextmain/about" component={About}></Route>
              <Route component={Err404}/>
            </Switch>
          </Router>
        </Content>
      </Layout>
    )
  }
}