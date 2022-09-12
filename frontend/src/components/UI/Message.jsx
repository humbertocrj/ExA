import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const Message = (props) => {
  return (
    <div className={`p-2 alert alert-${props.variant}`} role="alert">
        {props.text}
      </div>
  )
}

export default Message