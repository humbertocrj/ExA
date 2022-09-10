import React, {useState} from 'react'
import style from './Input.module.css'

const Input = (props) => {
    const [value, setValue] = useState("")

    const setIputValue = (data)=>{
        setValue(data)
        props.onChange(data)
    }

  return (
    <div className={style.inputContainer}>
        <label>{props.label}</label>
        <input 
        className={style.input} 
        {...props}
        onChange={(e)=>{setIputValue(e.target.value)}} />
    </div>
  )
}

export default Input