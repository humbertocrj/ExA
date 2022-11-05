import React from 'react'
import style from './Card.module.css'

const Card = (props) => {
  return (
    <div style={{backgroundColor:props.color}}className={style.card}>
        <h2>{props.title}</h2>
        <h3>{props.subtitle}</h3>
        <span>{props.titleInfo}</span>

    </div>
  )
}

export default Card