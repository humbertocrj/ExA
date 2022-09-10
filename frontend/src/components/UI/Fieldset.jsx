import React from 'react'
import style from './Fieldset.module.css'

const Fieldset = (props) => {
    return (
        <fieldset >
            <legend>{props.legend}</legend>
            {props.children}
        </fieldset>
    )
}

export default Fieldset