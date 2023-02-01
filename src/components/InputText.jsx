import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

// Styles

import '../scss/components/InputText.scss'


function InputText({placeholder, className, error: errorMessage, helperText: helperTextMessage, field, setFieldCreator, validate}) {
  const [error, setError] = useState(null);
  const [helperText, setHelperText] = useState(null);

  
  let setField = setFieldCreator();

  useEffect(()=>{
    !!errorMessage && setError(errorMessage);
    !!helperTextMessage && setHelperText(helperTextMessage);
  },[])



  function onChangeHandler(e){
    setField(e.target.value);
    !!validate && validate(e.target.value, setError, setHelperText);
  }


  return (
    <div className={`input-text ${error ? "input-text_error" : ''} ${className ? className : ''}`}>
        <input value={field} required onChange={onChangeHandler} className="input-text__input" placeholder=' ' type="text" />
        {error ?  <span className='input-text__helper-text'>{error}</span> : null}
        {helperText ?  <span className='input-text__helper-text'>{helperText}</span> : null}
        <span className="input-text__placeholder">{placeholder}</span>
        <span className="input-text__upper__placeholder">{placeholder}</span>
    </div>
  )
}

InputText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
}

export default InputText
