import React, {useState, useRef} from 'react';
import Timer from '../Timer';

const Input = ({gameProps}) => {
    let _ = gameProps;
    const [inputState, setInputState] = useState({value: ""});
    const inputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault()
        setInputState({ ...inputState, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        if (e) {
            e.preventDefault();  
        }
        _.setTimerState({..._.timerState, timerAction: "paused"})
        _.validateAnswer(inputState.value);
        setInputState({value: ""}); 
        _.displayNewProblem();
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
                                onBlur={() => inputRef.current.focus()}
                                className="invisibleInput" 
                                onChange={handleChange} 
                                type="number"
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
