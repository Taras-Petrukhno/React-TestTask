import React from 'react'
import { useState} from 'react'
import PropTypes from 'prop-types'

import '../scss/components/Button.scss'

function Button({children, text, disabled, maxi, className, onClick}) {
    const [isHover, setIsHover] = useState(false);


    function hoverHandler(event) {
      if(!disabled) {
        if (event.type === "mouseenter") {
          setIsHover(true);
        } else if (event.type === "mouseleave") {
          setIsHover(false);
        }
      }
      return;
    }

  return (
    <div className={
      `btn ${isHover ? 'btn_hover ' : ''}${disabled ? 'btn_disable ' : ''}${maxi ? 'btn_maxi ' : ''}${className ? className + ' ' : ''}`
    } 
       onMouseEnter={(e)=>{hoverHandler(e)}} 
       onMouseLeave={(e)=>{hoverHandler(e)}} 
       onClick={onClick}>
        {children}
        {!!text && !children && <span>{text}</span>}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.element,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  maxi: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
