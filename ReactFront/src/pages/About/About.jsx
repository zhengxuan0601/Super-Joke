import React from 'react'
import store from '@/redux'
export default class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: store.getState().inputVal
    }
    store.subscribe(() => {
      this.setState({
        count: store.getState().inputVal
      })
    })
  }

  addCountClick () {
    const action = {
      type: 'SET_UPDATE_VALUE',
      value: this.state.count + 1
    }
    store.dispatch(function (dispatch) {
      dispatch(action)
    })
  }

  render () {
    return (
      <div>
        <p 
          onClick={ this.addCountClick.bind(this) }
          style={{ cursor: 'pointer' }}>关于</p>
        <span>{ this.state.count }</span>
      </div>
    )
  }
}