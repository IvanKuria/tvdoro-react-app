import React, { useState, useEffect, Component } from 'react';
import "../index.css";
import PomodoroCounter from './PomodoroCounter';
import Tabs from './Tabs';
import StartPause from './StartPause';

function Counter() {
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [isShortBreak, setIsShortBreak] = useState(false);
    const [minutes, setMinutes] = useState(40);
    const [seconds, setSeconds] = useState(0);
    const [pomodorStreakCounter, setPomodoroStreakCounter] = useState(0);
    const [breakStreakCounter, setBreakStreakCounter] = useState(0);


    // Set initial timer values when `isPomodoro` changes
    useEffect(() => {
        document.body.style.backgroundColor = isPomodoro ? "rgb(186, 73, 73)" : isShortBreak ? "rgb(56, 133, 138)" : "rgb(0, 0, 0)"

        handleReset(false);

        return (() => {
            document.body.style.backgroundColor = "";
        })
        
    }, [isPomodoro, isShortBreak, isLongBreak]);


    // Timer logic
    useEffect(() => {
        if (!isActive) return;
    
        const intervalId = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(intervalId);    
                if (isPomodoro) {
                    setPomodoroStreakCounter(ps => ps + 1);
                    if ((pomodorStreakCounter) % 3 === 0) {
                        // Transition to Long Break after 3 Pomodoros
                        handleLongBreak();
                    } else {
                        // Transition to Short Break
                        handleShortBreak();
                    }
                } else {
                    setBreakStreakCounter(bs => bs + 1);
                    // Transition back to Pomodoro after any break
                    handlePomodoro();
                }
            } else if (seconds > 0) {
                setSeconds(s => s - 1);
            } else {
                setMinutes(m => m - 1);
                setSeconds(59);
            }
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [isActive, minutes, seconds, isPomodoro, isShortBreak, isLongBreak, pomodorStreakCounter]);
    

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
        console.log("Start/pause button clicked!")
    }

    function handlePomodoro() {
        setIsPomodoro(true);
        setIsShortBreak(false);
        setIsLongBreak(false);
        // setIsActive(true); // Stop the timer when switching modes
    }

    function handleShortBreak() {
        setIsShortBreak(true);
        setIsPomodoro(false);
        setIsLongBreak(false);
        // setIsActive(true); // Stop the timer when switching modes
    }

    function handleLongBreak() {
        setIsLongBreak(true);
        setIsPomodoro(false);
        setIsShortBreak(false);
    }

    function initalizeMinutesSeconds() {
        if (isPomodoro) {
            setMinutes(50); // Default Pomodoro time
            setSeconds(0);
        } else if (isLongBreak) {
            setMinutes(30); // Default Long Break time
            setSeconds(0);
        } else {
            setMinutes(10); // Default Short Break time
            setSeconds(0);
        }
    }

    function handleReset(pause=false) {
        if (pause){
            initalizeMinutesSeconds()
        } else {
            initalizeMinutesSeconds()
            if (isActive) {
                handleStartPause()
            }
                
        }
        
    }

    return (
        <>
            <div className="counter-title-container">
            <Tabs 
                pomodoroOnClick={handlePomodoro} 
                pomodoroClassName={isPomodoro ? "active-tab" : ""}
                tikTokOnClick={handleShortBreak}
                tikTokClassName={isShortBreak ? "active-tab" : ""}
                longBreakClassName={isLongBreak ? "long-break-tab" : ""}
            />
                <div className="counter-container">
                    <span>{formatTime()}</span>
                </div>
                <StartPause 
                    startPauseOnClick={handleStartPause}
                    startPauseStyle = {{color: isPomodoro ? "rgb(186, 73, 73)": isShortBreak ? "rgb(56, 133, 138)" : "rgb(0, 0, 0)"}}
                    startPauseButtonText={!isActive ? "START" : "PAUSE"}
                    resetOnClick={handleReset}
                    resetStyle={{color: isPomodoro ? "rgb(186, 73, 73)": isShortBreak ? "rgb(56, 133, 138)" : "rgb(0, 0, 0)"}}
                />
            </div>
            {isPomodoro ? <PomodoroCounter counter={pomodorStreakCounter}/>: <PomodoroCounter counter={breakStreakCounter}/>}
        </>
    );
}

export default Counter;