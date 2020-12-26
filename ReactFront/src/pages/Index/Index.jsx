import React from 'react'
import './Index.less'
import { Button } from 'antd'

export default class Index extends React.Component {
  render () {
    return (
      <div className="co_index">
        <p>欢迎使用</p>
        <Button type="primary">React</Button>
      </div>
    )
  }
}