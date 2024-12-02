import React from 'react'
import PropTypes from "prop-types"
import "../index.css"

function PomodoroCounter(props) {
  return (
    <>
        <div className="title-counter">
            <span>{props.counter < 2 ? `Streak: ${props.counter}` : `Streaks: ${props.counter}`}</span>
        </div>
    </>
  )
}

// Proptypes
PomodoroCounter.PropTypes = {
  counter: PropTypes.number,
}

export default PomodoroCounter