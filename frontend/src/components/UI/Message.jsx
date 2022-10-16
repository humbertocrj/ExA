import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';


const Message = (props) => {
  return (
    <div className="position-relative">
      <div className={`alert alert-${props.variant} px-4 py-2 w-100 position-absolute`} role="alert">
        {props.text}
      </div>
    </div>
  )
}

export default Message