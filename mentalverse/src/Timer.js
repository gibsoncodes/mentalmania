import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const {initialSeconds = 5} = props.initialSeconds;
    const [seconds, setSeconds ] =  useState(initialSeconds);
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
                if (seconds === 0) {
                    clearInterval(myInterval);
                    props.handleSubmit();
                } 
            }
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        } else {
            setSeconds(initialSeconds)
        }
    }, [props, initialSeconds, seconds] );

    return (
        <div>
           {seconds}
        </div>
    )
}

export default Timer;