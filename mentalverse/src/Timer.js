import React from 'react'
import { useState, useEffect, useReducer } from 'react';

const Timer = (props) => {
    const {initialSeconds = 5} = props.initialSeconds;
    const [seconds, setSeconds ] =  useState(initialSeconds);

    console.log("refresh")
    let timerStyle;
    if (props.timerState.timerAction === "default") {
        console.log("mnm")
        timerStyle = { animation: "slide 6s", height: "100%"}
    } else if (props.timerState.timerAction === "restart") {
        timerStyle = { animation: "none"}
    } else if (props.timerState.timerAction === "paused") {
        timerStyle = { animation: "slide 6s", animationPlayState: "paused"}
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