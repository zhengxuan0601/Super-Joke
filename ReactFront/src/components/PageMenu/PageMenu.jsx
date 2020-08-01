import React from 'react'
import './PageMenu.less'
import { Menu } from 'antd'
import NavList from '@/navConfig'
import { NavLink, withRouter } from 'react-router-dom'
import { AlignLeftOutlined, MailOutlined } from '@ant-design/icons'

const { SubMenu } = Menu

class PageMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '',
      openKeys: [],
      rootSubmenuKeys: []
    }
  }
  componentDidMount () {
    const activeKey = NavList[0].router
    let rootSubmenuKeys = NavList.filter(item => item.children && item.children.length)
    rootSubmenuKeys = rootSubmenuKeys.map(item => item.router)
    this.setState({ activeKey, rootSubmenuKeys })
    this.props.history.replace(NavList[0].router)
  }

  handleMenuClick = e => {
    this.setState({
      activeKey: e.key
    })
  }

  toggleCollapsed = () => {
    this.props.handelCollapsed(!this.props.collapsed)
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  render () {
    return (
      <div className='h-page-menu'>
        <div className="btn_toggle">
          <AlignLeftOutlined onClick={this.toggleCollapsed}/>
        </div>
        <Menu
        selectedKeys={[this.state.activeKey]}
        onClick={this.handleMenuClick}
        onOpenChange={this.onOpenChange}
        openKeys={this.state.openKeys}
        mode="inline">
          {NavList.map(itemName => {
            if (itemName.children && itemName.children.length) {
              return (
                <SubMenu
                  key={itemName.router}
                  title={
                    <span>
                      <MailOutlined />
                      <span>{itemName.title}</span>
                    </span>
                  }>
                  {itemName.children.map(item => {
                    return (
                      <Menu.Item key={item.router}>
                        <NavLink to={item.router}><span>{item.title}</span></NavLink>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={itemName.router} icon={<MailOutlined />}>
                  <NavLink to={itemName.router}><span>{itemName.title}</span></NavLink>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </div>
    )
  }
}
export default withRouter(PageMenu)