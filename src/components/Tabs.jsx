import React from 'react'
import PropTypes from "prop-types"
import "../index.css"

function Tabs(props) {
  return (
    <>
        <div className="titles-container">
            <button 
                onClick={props.pomodoroOnClick} 
                className={props.pomodoroClassName}
            >
                Pomodoro
            </button>
            <button 
                onClick={props.tikTokOnClick} 
                className={props.tikTokClassName}
            >
                TikTok Break
            </button>
            <button
                className={props.longBreakClassName}
            >
                Long Break
            </button>
        </div>
    </>
  )
}

// Proptypes
Tabs.PropTypes = {
    pomodoroOnClick: PropTypes.func,
    pomodoroClassName: PropTypes.func,
    tikTokOnClick: PropTypes.func,
    tikTokClassName: PropTypes.func,
    longBreakClassName: PropTypes.func,

}

export default Tabs