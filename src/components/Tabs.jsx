import React from 'react'
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
        </div>
    </>
  )
}

export default Tabs