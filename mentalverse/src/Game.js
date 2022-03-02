import React, {useState} from 'react'
import Categories from './Categories';

const Game = ({gameProps}) => {

    const [inputState, setInputState] = useState({value: ""});
    let _ = gameProps;

    const handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value;
        setInputState({ ...inputState, [e.target.id]: value });
    }

    function handleSubmit(e) {
        if (e) e.preventDefault();  
        _.setTimerState({..._.timerState, timerAction: "paused"})
        _.validateAnswer(inputState.value);
        setInputState({value: ""}); 
        _.displayNewProblem();
    }

    return (
        <div>
            <h2>{gameProps.problem.equation}</h2>
            <Categories startGame={_.startGame} handleSubmit={_.handleSubmit} timerState={_.timerState} setTimerState={_.setTimerState}/>
            <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                onChange={handleChange}
                id="value"
                type="number"
                value={inputState.value}
            />
        </form>

        <ul>
            { _.results ?
                _.results.map((result, id) => {
                     return (
                        <li key={id}>
                            <h3>Equation: {result.problem.equation}</h3>
                            <h4>Correct Answer: {result.userAnswer}</h4>
                            <h4>My Answer: {result.problem.answer}</h4>
                        </li>
                    );
                }) : null
            }
        </ul>

        <h3>{_.score.right}</h3>
        <button onClick={(e) => _.toggleGame(e)}>Pause Game</button>
        <button onClick={(e) => _.endGame(e)}>End Game</button>
            {/* <button onClick={handleClick}>BUTTON</button> */}
        </div>
    )
}

export default Game
