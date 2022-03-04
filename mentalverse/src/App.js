import { useState, useEffect, useRef } from 'react';
import './App.css';
import NewGame from './math'
import Game from './Game';
import Categories from './Categories';
import MagicBorder from './MagicBorder';




function App() {
    let whiteArray = new Array(7).fill("FFFFFF");
    const initialBorderState = {
            1: [...whiteArray],
            2: [...whiteArray],
            3: [...whiteArray],
            4: [...whiteArray],
    }
    console.log(initialBorderState)
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
        if (curr.side === 1 || curr.side === 4) {
            console.log(curr)
            newBorderState[curr.side][6 - curr.depth] = randomColor;
        } else {
            newBorderState[curr.side][curr.depth] = randomColor;
        }
        setBorderState(newBorderState)
        let newCurr = curr;
        if (newCurr.side === 4) {
            newCurr.side = 1;
            newCurr.depth += 1;
            if (newCurr.depth > 6) {
                newCurr.depth = 0;
            }  
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
            setCurr({...curr, side: 1, depth: 0})
        }
        setScore(newScore);
    }

    const gameProps = {displayNewProblem: displayNewProblem, validateAnswer: validateAnswer, game: game, problem: problem, startGame: startGame, timerState: timerState, setTimerState: setTimerState, results: results, score: score, toggleGame: toggleGame, endGame: endGame}

    return (
      <div className="App">
        <MagicBorder borderState={borderState} score={score} gameProps={gameProps}/>
      </div>
    );
}

export default App;
