import React, {useState, useRef} from 'react'

const Input = ({gameProps}) => {
    let _ = gameProps;
    const [inputState, setInputState] = useState({value: ""});
    const inputRef = useRef(null);
    console.log(inputState)

    const handleChange = (e) => {
        e.preventDefault()
        setInputState({ ...inputState, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        if (e) e.preventDefault();  
        _.setTimerState({..._.timerState, timerAction: "paused"})
        _.validateAnswer(inputState.value);
        _.displayNewProblem();
        setInputState({value: ""}); 
    }

    return (
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
                                onChange={(e) => handleChange(e)} 
                                type="number"
                                id="value"
                                value={inputState.value}
                            />
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default Input
