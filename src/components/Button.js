import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ whenClicked, label }) => <button onClick={whenClicked}>{label}</button>

Button.propTypes = {
  label: PropTypes.string.isRequired,
  whenClicked: PropTypes.func.isRequired,
}

export default Button
