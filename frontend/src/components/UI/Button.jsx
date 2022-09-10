import React from 'react'
import style from './Button.module.css'
import './Button.module.css'

const Button = (props) => {
  return (
    <button className="primary" {...props}>
        {props.text}
    </button>
  )
}

export default Button