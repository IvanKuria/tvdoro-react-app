import React, { useState, useEffect } from 'react';
import "../index.css";

function Counter() {
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [minutes, setMinutes] = useState(40);
    const [seconds, setSeconds] = useState(0);

    // Set initial timer values when `isPomodoro` changes
    useEffect(() => {
        document.body.style.backgroundColor = isPomodoro ? "rgb(186, 73, 73)" : "rgb(56, 133, 138)"

        if (isPomodoro) {
            setMinutes(40);
            setSeconds(0);
        } else {
            setMinutes(20);
            setSeconds(0);
        }
        return (() => {
            document.body.style.backgroundColor = "";
        })
        
    }, [isPomodoro]);

    // Timer logic
    useEffect(() => {
        if (!isActive) return; // Do nothing if the timer is not active

        const intervalId = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(intervalId);
                setIsActive(a => !a);
                setIsPomodoro(p => !p);
            } else if (seconds > 0) {
                setSeconds(s => s - 1);
            } else {
                setMinutes(m => m - 1);
                setSeconds(59);
            }
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on dependency changes
    }, [isActive, minutes, seconds]);

    // Helper functions
    function formatTime() {
        return `${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(number) {
        return (number < 10 ? "0" : "") + number;
    }

    // Button handlers
    function handleStartPause() {
        setIsActive(a => !a);
    }

    function handlePomodoro() {
        setIsPomodoro(true);
        setIsActive(false); // Stop the timer when switching modes
    }

    function handleBreak() {
        setIsPomodoro(false);
        setIsActive(false); // Stop the timer when switching modes
    }

    // Render
    return (
        <div className="counter-title-container">
            <div className="titles-container">
                <button 
                    onClick={handlePomodoro} 
                    className={isPomodoro ? "active-tab" : ""}
                >
                    Pomodoro
                </button>
                <button 
                    onClick={handleBreak} 
                    className={!isPomodoro ? "active-tab" : ""}
                >
                    TV Break
                </button>
            </div>
            <div className="counter-container">
                <span>{formatTime()}</span>
            </div>
            <div className="start-button">
                <button onClick={handleStartPause} style={{color: isPomodoro ? "rgb(186, 73, 73)": "rgb(56, 133, 138)"}}>{!isActive ? "START" : "PAUSE"}</button>
            </div>
        </div>
    );
}

export default Counter;