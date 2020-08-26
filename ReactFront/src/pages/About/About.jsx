import React, { useState, useEffect } from 'react'

export default function About () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    return () => {
      console.log('clear')
    }
  })

  return (
    <div>
      关于
      <p onClick={ () => { setCount(count + 1) } }>{ count }</p>
    </div>
  )
}