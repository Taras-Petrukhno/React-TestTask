import PropTypes from 'prop-types'
import React from 'react'

// Styles
import '../scss/components/InputRadio.scss'


export const InputRadio = ({id, name, value, label, className, setFieldCreator, validate}) => {

  let setField = setFieldCreator();

  let onChangeHandler = (e) => {
    setField(Number(e.target.value))
    !!validate && validate(e.target.value)
  };

  return (
    <label htmlFor={id} className={`input-radio__label ${className ? className : ""}`}>
        <input onChange={onChangeHandler} type="radio" className="input-radio__input" value={value} id={id} name={name}/>
        <span className="input-radio__text">{label}</span>  
    </label>
  )
}

InputRadio.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    className:PropTypes.string,
}



export default InputRadio