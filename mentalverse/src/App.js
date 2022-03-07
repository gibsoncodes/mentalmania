import { useState, useEffect, useRef } from 'react';
import './App.css';
import NewGame from './math'
import MagicBorder from './MagicBorder';
import Timer from './Timer';


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function App() {
    let whiteArray = new Array(7).fill("#FFFFFF");
    let blackArray = new Array(11).fill("#000000")
    const initialBorderState = {
            1: [...whiteArray],
            2: [...whiteArray],
            3: [...whiteArray],
            4: [...whiteArray],
    }
    const [game, setGame] = useState(() => new NewGame());
    const [gameState, setGameState] = useState({playState: "offline"})
    const [score, setScore] = useState(game.score);
    const [problem, setProblem] = useState(game.currentProblem);
    const [timerState, setTimerState] = useState({timeValue: 5, timerAction: "offline"});
    const [results, setResults] = useState(null);
    const [borderState, setBorderState] = useState(initialBorderState);
    const [titleState, setTitleState] = useState([...blackArray]);
    const [curr, setCurr] = useState({side: 1, depth: 0, plat: 0});

    function maniaAnimation(color) {
        const elBorder = document.getElementById("maniaBorder")
        const elMid = document.getElementById("maniaBorder")
        const elTitle = document.getElementById("maniaBorder")

        // elBorder.classList.add("fadeAnim");
        setBorderState(initialBorderState)
        
        
            for (let i = 0; i < 7; i++) {
                for (let j = 1; j < 5; j++) {
                    let index = j === 1 || j === 4 ? i : (6 - i);
                    setTimeout(() => {
                        let newBorderState = borderState;
                        newBorderState[j][index] = color;

                        setBorderState(prevState => {
                            return {...prevState, ...newBorderState}
                        });
                    }, ((i+1) * (j+1) * 300))
                }
            }
        
    }

    function addBorderElem() {
        const randomColor = getRandomColor();
        let newBorderState = borderState;
        if (curr.depth === 7) {
            console.log("yo")
            maniaAnimation(randomColor);
            // let newTitle = titleState;
            // newTitle[curr.plat] = randomColor;
            // setTitleState([...newTitle])
            // setBorderState(initialBorderState);
            // setCurr({...curr, side: 1, depth: 0, plat: curr.plat + 1});
        } else {
            console.log("hi")
            if (curr.side === 1 || curr.side === 4) {
                newBorderState[curr.side][6 - curr.depth] = randomColor;
            } else {
                newBorderState[curr.side][curr.depth] = randomColor;
            }
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
        addBorderElem();

        // setTimeout(() => {
        //     setTimerState({...timerState, timerAction: "restart"})
        //     const timerRef = document.getElementById("timerRef");
        //     void timerRef.offsetHeight;
        //     game.serveProblem();
        //     setProblem(game.currentProblem);
        // }, 2000)
    }

    const validateAnswer = (value) => {
        console.log("hi")
        // let didSolve = game.handleUserInput(value);
        // let newScore = score;
    
        // if (didSolve) {
        //     newScore.right += 1;
        //     addBorderElem();
        // } else {
        //     newScore.wrong += 1;
        //     setTitleState([...blackArray])
        //     setBorderState(initialBorderState);
        //     setCurr({...curr, side: 1, depth: 0, plat: 0})
        // }
        // setScore(newScore);
    }

    const gameProps = {displayNewProblem: displayNewProblem, validateAnswer: validateAnswer, gameState: gameState, game: game, problem: problem, startGame: startGame, timerState: timerState, setTimerState: setTimerState, results: results, score: score, toggleGame: toggleGame, endGame: endGame}

    return (
      <div className="App">
        <MagicBorder titleState={titleState} borderState={borderState} score={score} gameProps={gameProps}/>
      </div>
    );
}

export default App;
