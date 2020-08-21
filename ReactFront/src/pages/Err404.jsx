import React from 'react'
const outCss = {
  position: 'relative',
  height: '100%'
}
const imgCss = {
  position: 'absolute',
  width: '360px',
  top: '50%',
  left: '50%',
  margin: '-180px 0 0 -180px'
}
export default class Err extends React.Component {
  render () {
    return (
      <div style={outCss}>
        <img style={imgCss} src={require('../assets/basicimg/error404.png')} alt=""/>
      </div>
    )
  }
}