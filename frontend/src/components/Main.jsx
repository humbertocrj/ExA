import React from 'react'
import style from "./Main.module.css"

const Main = (props) => {
  const position = "position-relative"
  return (
    <div className="p-5 w-100 position-relative">{props.children}</div>
  )
}

export default Main