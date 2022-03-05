import React from 'react'
import { useState, useEffect, useRef } from 'react';

const Timer = (props) => {
    const {initialSeconds = 5} = props.initialSeconds;
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [paused, setPaused] = useState(true)

    let timerStyle;
    if (props.timerState.timerAction === "default") {
        timerStyle = {animation: "slide 5s infinite"}
    } else if (props.timerState.timerAction === "restart") {
        timerStyle = {animation: ""}
    }

    useEffect(()=>{
        if (props.timerState.timerAction !== "offline") {
            if (props.timerState.timerAction === "restart") {
                setSeconds(initialSeconds);
            }
            if (props.timerState.timerAction === "default") {
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
            }
        } else {
            setSeconds(initialSeconds)
        }
    }, [props, initialSeconds, seconds] );

    return (
        <div style={timerStyle} className={"timer"}>
        </div>
    )
}

export default Timer;