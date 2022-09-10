import React, {useState} from 'react'

import style from './Select.module.css'
const Select = (props) => {

  const [value, setValue] = useState()

  const setSelectedValue = (data)=>{
    setValue(data)
    props.onChange(data)

  }
  return (
    <div className={style.selectContainer}>
      <label htmlFor="tipo">{props.label}</label>
      <select 
      name="tipo"
       id="tipo"
       onChange={(e)=>setSelectedValue(e.target.value)}>
       {props.data.map((data, key)=>{
        return <option key={key} value={data}>{data}</option>
       })}
       
      </select>
    </div>
  )
}

export default Select