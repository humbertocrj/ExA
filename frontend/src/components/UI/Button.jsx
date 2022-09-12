import React from 'react'
import style from './Button.module.css'
import './Button.module.css'

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const Btn = (props) => {
  return (
    <Button  variant={props.variant} {...props}>
        {props.text}
    </Button>
  )
}

export default Btn