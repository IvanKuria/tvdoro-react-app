import React from 'react';
import PropTypes from "prop-types"
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

// Proptypes
StartPause.PropTypes = {
  startPauseOnClick: PropTypes.func,
  startPauseStyle: PropTypes.func,
  startPauseButtonText: PropTypes.func,
  resetStyle: PropTypes.func,
}

export default StartPause;
