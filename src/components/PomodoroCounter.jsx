import React from 'react'
import "../index.css"

function PomodoroCounter(props) {
  return (
    <>
        <div className="title-counter">
            <span>{props.counter < 2 ? `Steak: ${props.counter}` : `Steaks: ${props.counter}`}</span>
        </div>
    </>
  )
}

export default PomodoroCounter