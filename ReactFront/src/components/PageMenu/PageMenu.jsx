import React from 'react'
import './PageMenu.less'
import { Menu } from 'antd'
import NavList from '@/navConfig'
import { NavLink, withRouter } from 'react-router-dom'
import { MenuFoldOutlined } from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1850723_228q6dczm48.js', // 在 iconfont.cn 上生成
});

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
    this.pageRouterUpdate()
  }

  /* 刷新页面及路由跳转时候菜单高亮显示状态及当前路由显示 */
  pageRouterUpdate () {
    const currentRoute = this.props.location.pathname
    if (NavList.find(item => item.router === currentRoute)) {
      // 检查当前路由是否存在路由列表, 存在则继续停留在当前路由, 否则跳转至第一个路由
      const activeKey = NavList.find(item => item.router === currentRoute).router
      this.setState({ activeKey })
    } else {
      const activeKey = NavList[0].router
      let rootSubmenuKeys = NavList.filter(item => item.children && item.children.length)
      rootSubmenuKeys = rootSubmenuKeys.map(item => item.router)
      this.setState({ activeKey, rootSubmenuKeys })
      this.props.history.replace(NavList[0].router)
    }
  }

  handleMenuClick (e) {
    this.setState({
      activeKey: e.key
    })
  }

  toggleCollapsed () {
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
          <MenuFoldOutlined onClick={this.toggleCollapsed.bind(this)} />
        </div>
        <Menu
          selectedKeys={[this.state.activeKey]}
          onClick={this.handleMenuClick.bind(this)}
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
                      <MyIcon type={itemName.icon} />
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
                <Menu.Item key={itemName.router} icon={<MyIcon type={itemName.icon} />}>
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