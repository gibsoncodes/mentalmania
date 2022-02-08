import React, {useState} from 'react'
import Game from './math'

const Game = (game) => {
    const [problem, setProblem] = useState({});

    function handleClick() {
        let newProblem = game.serveProblem();
        setProblem(newProblem);
    }

    return (
        <div>
            <h2>{problem.equation}</h2>
            <button onClick={() => handleClick()}>BUTTON</button>
        </div>
    )
}

export default Game
