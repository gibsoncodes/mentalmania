import { useState, useEffect, useRef } from 'react';
import './App.css';
import NewGame from './math'
import Game from './Game';
import Categories from './Categories';
import MagicBorder from './MagicBorder';


const whiteArray = new Array(7).fill("FFFFFF");
const initialBorderState = {
        1: [...whiteArray],
        2: [...whiteArray],
        3: [...whiteArray],
        4: [...whiteArray],
}

function App() {

    const [game, setGame] = useState(() => new NewGame());
    const [gameState, setGameState] = useState({playState: "offline"})
    const [score, setScore] = useState(game.score);
    const [problem, setProblem] = useState(game.currentProblem);
    const [timerState, setTimerState] = useState({timeValue: 5, timerAction: "offline"});
    const [results, setResults] = useState(null);
    const [borderState, setBorderState] = useState(initialBorderState)
    const [curr, setCurr] = useState({side: 1, depth: 0})

    function addBorderElem() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        let newBorderState = borderState;
        newBorderState[curr.side][curr.depth] = randomColor;
        setBorderState(newBorderState)
        let newCurr = curr;

        if (newCurr.side === 4) {
            newCurr.side = 1;
            newCurr.depth += 1;
        } else {
            newCurr.side += 1;
        }
        setCurr(newCurr);
    }

    const startGame = (cats) => {
        game.addCategories(cats)
        game.serveProblem();
        setProblem(game.currentProblem);
        setGameState({...gameState, playState: "default"})
        setTimerState({...timerState, timerAction: "restart"})
    }

    const toggleGame = (e) => {
        e.preventDefault();
        let newState = gameState.playState === "paused" ? "default" : "paused";
        setGameState({...gameState, playState: newState})
        setTimerState({...timerState, timerAction: newState})

    }

    const endGame = (e) => {
        e.preventDefault();
        setGameState({...gameState, playState: "ended"})
        setTimerState({...timerState, timerAction: "offline"})
        validateAnswer();
        setResults(game.getPlaySet());
    }

    const displayNewProblem = () => {
        setTimeout(() => {
            setTimerState({...timerState, timerAction: "restart"})
            game.serveProblem();
            setProblem(game.currentProblem);
        }, 2000)
    }

    const validateAnswer = (value) => {
        let didSolve = game.handleUserInput(value);
        let newScore = score;
    
        if (didSolve) {
            newScore.right += 1;
            addBorderElem();
        } else {
            newScore.wrong += 1;
            setBorderState(initialBorderState);
        }
        setScore(newScore);
    }

    const gameProps = {displayNewProblem: displayNewProblem, validateAnswer: validateAnswer, game: game, problem: problem, startGame: startGame, timerState: timerState, setTimerState: setTimerState, results: results, score: score, toggleGame: toggleGame, endGame: endGame}

    return (
      <div className="App">
        <Game gameProps={gameProps} />
        <MagicBorder borderState={borderState} score={score}/>
      </div>
    );
}

export default App;
