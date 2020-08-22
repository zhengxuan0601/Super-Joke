import React from 'react'
import { getmainClassifyList } from '@/api/allServeApi'

export default class About extends React.Component {
  componentDidMount () {
    this.getMockParams.bind(this)()
  }

  getMockParams () {
    getmainClassifyList().then(res => {
      console.log(res)
    })
  }
  
  render () {
    return (
      <div>
        关于我们
      </div>
    )
  }
}