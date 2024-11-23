import React from 'react';
import "../index.css";
import { Toaster } from 'react-hot-toast';

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
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default StartPause;
