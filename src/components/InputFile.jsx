import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// styles
import '../scss/components/InputFile.scss'

function InputFile({className, error: errorMessage, helperText: helperTextMessage, setFieldCreator, validate}) {
    const [error, setError] = useState('');
    const [screen, setScreen] = useState('Upload your photo');
    const [helperText, setHelperText] = useState('');
    const setField = setFieldCreator();

    useEffect(()=> {
        if(errorMessage && typeof errorMessage === 'string') {
            setError(errorMessage)
        }
    },[errorMessage])

const handleChange = (e) => {
    validate(e.target.files, setError, setScreen);
    setField(e.target.files[0])
}

  return (
    <div className={`input-file ${error ? 'input-file_error' : ''}`}>
        <label htmlFor='user-avatar' className={`input-file__label ${className}`}>
            <input  className="input-file__input" onChange={handleChange} type="file" id="user-avatar" />
            <button  type="button"  className="input-file__btn">Upload</button>
            <p className="input-file__screen">{screen}</p>
            {error && <span className="input-file__helper-text">{error}</span>}
            {helperText && <span className="input-file__helper-text">{helperText}</span>}
        </label>
    </div>
  )
}

InputFile.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    setFieldCreator: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

export default InputFile
