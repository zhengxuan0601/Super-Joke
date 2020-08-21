import React from 'react'
import { Layout } from 'antd'
import PageMenu from '@/components/PageMenu/PageMenu'
import routes from '@/router/Router'
import {renderRoutes} from 'react-router-config';
const { Sider, Content } = Layout

export default class ContextMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  handelCollapsed = newCollapsed => {
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
          {renderRoutes(routes)}
        </Content>
      </Layout>
    )
  }
}
