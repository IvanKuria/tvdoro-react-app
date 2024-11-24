import React from 'react';
import "../index.css";

function StartPause(props) {

  return (
    <>
      <div className="start-button">
        <button 
          onClick={props.startPauseOnClick} 
          style={props.startPauseStyle}
        >
          {props.startPauseButtonText}
        </button>
        <button 
          onClick={() => props.resetOnClick(false)} 
          style={props.resetStyle}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default StartPause;
