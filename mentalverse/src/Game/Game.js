import React from 'react'
import Categories from './Categories';

const Game = ({gameProps}) => {
    let _ = gameProps;

    return (
        <div className="game">
            <Categories startGame={_.startGame} handleSubmit={_.handleSubmit} timerState={_.timerState} setTimerState={_.setTimerState}/>

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

        {/* <h3>{_.score.right}</h3> */}
        {/* <button onClick={(e) => _.toggleGame(e)}>Pause Game</button>
        <button onClick={(e) => _.endGame(e)}>End Game</button> */}
            {/* <button onClick={handleClick}>BUTTON</button> */}
        </div>
    )
}

export default Game
