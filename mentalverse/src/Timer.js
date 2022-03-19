import React from 'react'
import { useState, useEffect} from 'react';

const Timer = (props) => {
    const initialSeconds = props.timerState.timeValue;
    const [seconds, setSeconds ] =  useState(initialSeconds);

    const timeString = "slide " + (initialSeconds * 1.2) + "s linear";
    let timerStyle;
    if (props.timerState.timerAction === "default") {
        timerStyle = { animation: timeString}
    } else if (props.timerState.timerAction === "restart") {
        timerStyle = { animation: "none"}
    } else if (props.timerState.timerAction === "paused") {
        timerStyle = { animation: timeString, animationPlayState: "paused"}
    }

    useEffect(()=>{
        if (props.timerState.timerAction !== "offline") {
            if (props.timerState.timerAction === "restart") {
                props.setTimerState({...props.timerState, timerAction: "default"})
                setSeconds(initialSeconds);
            }
            let myInterval = setInterval(() => {
            if (props.timerState.timerAction !== "paused") {  
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 1) {
                    clearInterval(myInterval);
                    props.handleSubmit();
                } 
            }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        } else {
            setSeconds(initialSeconds)
        }
    }, [props, initialSeconds, seconds] );

    return (
        <div style={timerStyle} id="timerRef" className={"timer"}></div>
    )
}

export default Timer;