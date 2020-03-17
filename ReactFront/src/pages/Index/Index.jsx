import React from 'react'
import './Index.less'
import { Button } from 'antd'
import API from '../../api/allServeApi'

export default class Index extends React.Component {
  componentDidMount () {

  }

  getMethods = () => {
    API.userLogin('13857136520', '123456').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className="co_index">
        <p>欢迎使用</p>
        <Button onClick={() => this.getMethods()} type="primary">React</Button>
      </div>
    )
  }
}