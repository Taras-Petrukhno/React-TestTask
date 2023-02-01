import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Components
import Loader from './Loader';

// Style
import '../scss/components/Image.scss'

function Image({className, src, alt}) {
    let [isLoading, setIsLoading] = useState(true);
    
  
  const onLoadHandler = (e) => {
    setIsLoading(false);
  }

    return (
    <div className={"image-loading " + className}>
        {isLoading ? <Loader  /> : null}
        <img className={`image-loading__img ${isLoading ? "image-loading__img_hidden" : ""}`} src={src} alt={alt} onLoad={onLoadHandler} />
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

export default Image
