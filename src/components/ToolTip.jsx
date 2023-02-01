import React from 'react'
import PropTypes from 'prop-types'

// Styles
import '../scss/components/ToolTip.scss'


function ToolTip({tip, text, className}) {
  return (
    <div data-tip={tip} className={`tool-tip ${className ? className : ''}`}>
        <p className="tool-tip__text">{text}</p>
    </div>
  )
}

ToolTip.propTypes = {
    tip: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default ToolTip
