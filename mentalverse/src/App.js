import { useState, useEffect, useRef } from 'react';
import './App.css';
import NewGame from './math'
import MagicBorder from './MagicBorder';
import YouAreMathMonster from './MagicBorder/YouAreMathMonster';
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
    const [problem, setProblem] = useState(game.currentProblem);
    const [timerState, setTimerState] = useState({timeValue: 8, timerAction: "offline"});
    const [borderState, setBorderState] = useState(initialBorderState);
    const [titleState, setTitleState] = useState([...blackArray]);
    const [curr, setCurr] = useState({side: 1, depth: 0, plat: 0, run: 0});
    const [micros, setMicros] = useState(() => new Array(1600).fill("#FFF"))

    function winAnimation() {
        micros.forEach((micro, index) => {
            setTimeout(() => {
                setMicros(prevMicros => {
                    let newMicros = [...prevMicros];
                    newMicros[index] = "#000";
                    return [...newMicros];
                })
            }, index * (timerState.timeValue * 10))
        })                
    }

    function maniaAnimation(color, flag) {
        setBorderState(prevState => {
            return {...initialBorderState};
        });

        let colors = [...titleState.slice(0, curr.plat), color];
        for (let all = 0; all <= curr.plat; all++) {
            let sum = 0;
            setTimeout(() => {
                for (let i = 6; i >= 0; i--) {
                    for (let j = 1; j < 5; j++) {
                        sum++;
                        setTimeout(() => {
                            let index = j === 1 || j === 4 ? i : (6 - i);
                            setBorderState(prevState => {
                                const newState = Object.assign({}, prevState)
                                newState[j][index] = colors[all];
                                return {...newState};
                            });
                            if (i === 0 && j === 4 && all === curr.plat) {
                                if (flag) {
                                    setGameState(prevState => {
                                        return {...prevState, playState: "won"}
                                    })
                                    winAnimation()
                                } else {
                                    setTimeout(() => {
                                        let newTitle = titleState;
                                        newTitle[curr.plat] = color;
                                        setTitleState([...newTitle])
                                        setCurr({...curr, side: 1, depth: 0, plat: curr.plat + 1, run: 0});
                                        for (let j = 1; j < 5; j++) {
                                            setBorderState((prevState) => {
                                                const newState = Object.assign({}, prevState);
                                                newState[j] = [...whiteArray];
                                                return {...newState};
                                            })
                                        }
                                        displayNewProblem();
                                    }, 100)
                                }
                            }
                        }, sum * 150 + (all * 150))
                    }
                }
            })
        }
    }

    function addBorderElem() {
        const randomColor = getRandomColor();
        let newBorderState = borderState;
        if (curr.run === 28) {
            setTimerState(prev => {
                return {...prev, timerAction: "offline"};
            });
            setGameState(prevState => {
                return {...prevState, playState: "mania"}
            });
            if (curr.plat === 11) {
                maniaAnimation("#000", true)
            } else {
                maniaAnimation(randomColor, false);
            }
        } else {
            if (curr.side === 1 || curr.side === 4) {
                newBorderState[curr.side][6 - curr.depth] = randomColor;
            } else {
                newBorderState[curr.side][curr.depth] = randomColor;
            }
            setBorderState({...newBorderState})
            let newCurr = {...curr};
            newCurr.run += 1;
            if (newCurr.side === 4) {
                newCurr.side = 1;
                newCurr.depth += 1; 
            } else {
                newCurr.side += 1;
            }
            setCurr({...newCurr});
            displayNewProblem();
        }
    }

    const startGame = (payload) => {
        game.addCategories(payload.cats, payload.difficulty)
        game.serveProblem();
        setProblem(game.currentProblem);
        setGameState({...gameState, playState: "default"})
        setTimerState({...timerState, timerAction: "restart", timeValue: payload.timeValue})
    }

    const displayNewProblem = () => {
        setTimeout(() => {
            setGameState(prevState => {
                return {...prevState, playState: "default"}
            });
            setTimerState({...timerState, timerAction: "restart"})
            const timerRef = document.getElementById("timerRef");
            void timerRef.offsetHeight;
            game.serveProblem();
            setProblem(game.currentProblem);
        }, 2000)
    }

    const validateAnswer = (value) => {
        setGameState(prevState => {
            return {...prevState, playState: "paused"}
        });
        let didSolve = game.handleUserInput(value);
        if (didSolve) {
            addBorderElem();
        } else {
            setTitleState([...blackArray])
            setBorderState(initialBorderState);
            setCurr({...curr, side: 1, depth: 0, plat: 0, run: 0})
            displayNewProblem();
        }
    }

    const gameProps = {displayNewProblem: displayNewProblem, validateAnswer: validateAnswer, setGameState: setGameState, gameState: gameState, game: game, problem: problem, startGame: startGame, timerState: timerState, setTimerState: setTimerState}

    const main = gameState.playState !== "won" ? 
        (<MagicBorder titleState={titleState} borderState={borderState} gameProps={gameProps}/>)
        :
        (<YouAreMathMonster titleState={titleState} micros={micros}/>);

    return (
      <div className="App">
        {main}
      </div>
    );
}

export default App;
