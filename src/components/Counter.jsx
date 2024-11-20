import React, { useState, useEffect, Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import "../index.css";
import PomodoroCounter from './PomodoroCounter';

function Counter() {
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [minutes, setMinutes] = useState(40);
    const [seconds, setSeconds] = useState(0);
    const [pomodorStreakCounter, setPomodoroStreakCounter] = useState(1);
    const [breakStreakCounter, setBreakStreakCounter] = useState(1);

    const notify = () =>
        toast(isPomodoro ? "Good Job Studying" : "Time to Lock In!", {
            icon: '👏',
        });


    // Set initial timer values when `isPomodoro` changes
    useEffect(() => {
        document.body.style.backgroundColor = isPomodoro ? "rgb(186, 73, 73)" : "rgb(56, 133, 138)"

        if (isPomodoro) {
            setMinutes(1);
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
                setIsActive(false); // Pause the timer
                setIsPomodoro(p => !p); // Switch mode
                notify();
                isActive ? setBreakStreakCounter(bs => bs + 1): setPomodoroStreakCounter(ps => ps + 1)
                handleStartPause()
            } else if (seconds > 0) {
                setSeconds(s => s - 1);
            } else {
                setMinutes(m => m - 1);
                setSeconds(59);
            }
        }, 1000);
    
        return () => clearInterval(intervalId); // Cleanup interval on dependency changes
    }, [isActive, minutes, seconds, isPomodoro]);
    

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
        <>
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
                <button onClick={handleStartPause} style={{color: isPomodoro ? "rgb(186, 73, 73)": "rgb(56, 133, 138)"}}>
                    {!isActive ? "START" : "PAUSE"}
                </button>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            
        </div>
        {isActive ? <PomodoroCounter counter={pomodorStreakCounter}/>: <PomodoroCounter counter={breakStreakCounter}/>}
        </>
    );
}

export default Counter;