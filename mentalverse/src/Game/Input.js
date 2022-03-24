import React, {useState, useRef} from 'react';
import Timer from '../Timer';

const Input = ({gameProps}) => {
    let _ = gameProps;
    const [inputState, setInputState] = useState({value: ""});
    const inputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault()
        if (_.gameState.playState !== "paused") {
            if (e.target.value.length < inputState.value.length) {
                setInputState({ ...inputState, value: inputState.value.slice(0, -1)});
            } else {
                let pressed = e.target.value[e.target.value.length - 1]
                if (pressed === "-") {
                    if (inputState.value.length === 0) {
                        setInputState({ ...inputState, value: inputState.value + pressed});
                    }
                } else if (pressed === ".") {
                    if (inputState.value.indexOf(".") === -1) {
                        setInputState({ ...inputState, value: inputState.value + pressed});
                    }
                } else {
                    if ((pressed >= 0 && pressed <= 9)){
                        setInputState({ ...inputState, value: inputState.value + pressed});
                    }
                }
            }
        }
    }

    function handleSubmit(e) {
        if (e) {
            e.preventDefault();  
        }
        if (_.gameState.playState !== "paused") {
            _.setTimerState({..._.timerState, timerAction: "paused"})
            _.validateAnswer(inputState.value);
            setInputState({value: ""}); 
        }
    }

    return (
        <React.Fragment>
            <div className="mainPlay">
                <div className="equationDiv">
                    <h2 className="equation">
                        {_.problem.equation}
                    </h2>
                </div>
                <div className="inputDiv">
                    <div className="inputBar">
                        <h1 className="inputText">{inputState.value}</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input 
                                ref={inputRef}
                                autoFocus
                                autoComplete="off"
                                onBlur={() => inputRef.current.focus()}
                                className="invisibleInput" 
                                onChange={(e) => handleChange(e)}
                                id="value"
                                value={inputState.value}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <Timer initialSeconds={5} handleSubmit={handleSubmit} timerState={_.timerState} setTimerState={_.setTimerState}/>
        </React.Fragment>
    )
}

export default Input
