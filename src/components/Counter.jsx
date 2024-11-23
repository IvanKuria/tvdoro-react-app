import React, { useState, useEffect, Component } from 'react';
import "../index.css";
import PomodoroCounter from './PomodoroCounter';
import Tabs from './Tabs';
import StartPause from './StartPause';
import { toast } from 'react-hot-toast';

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

        handleReset(false);

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
                // setIsActive(false);
                setIsPomodoro(p => !p); // Switch mode
                notify();
                !isPomodoro ? setBreakStreakCounter(bs => bs + 1): setPomodoroStreakCounter(ps => ps + 1)                
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
        // setIsActive(false); // Stop the timer when switching modes
    }

    function initalizeMinutesSeconds() {
        if (isPomodoro) {
            setMinutes(0);
            setSeconds(10);
        } else {
            setMinutes(0);
            setSeconds(10);
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
                    pomodoroClassName= {isPomodoro ? "active-tab" : ""}
                    tikTokOnClick={handleBreak}
                    tikTokClassName={!isPomodoro ? "active-tab" : ""}
                />
                <div className="counter-container">
                    <span>{formatTime()}</span>
                </div>
                <StartPause 
                    startPauseOnClick={handleStartPause}
                    startPauseStyle = {{color: isPomodoro ? "rgb(186, 73, 73)": "rgb(56, 133, 138)"}}
                    startPauseButtonText={!isActive ? "START" : "PAUSE"}
                    resetOnClick={handleReset}
                    resetStyle={{color: isPomodoro ? "rgb(186, 73, 73)": "rgb(56, 133, 138)"}}
                />
            </div>
            {isPomodoro ? <PomodoroCounter counter={pomodorStreakCounter}/>: <PomodoroCounter counter={breakStreakCounter}/>}
        </>
    );
}

export default Counter;