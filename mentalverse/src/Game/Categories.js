import React, {useState} from 'react'
// import Timer from '../Timer';


const Categories = ({startGame, handleSubmit, timerState, setTimerState}) => {

    const categories = ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION", "ALGEBRA"];
    const [sliderState, setSliderState] = useState(8);
    const [difficultyState, setDifficultyState] = useState(1);

    const initialCategoryState = {};
    categories.forEach(cat => initialCategoryState[cat] = false)

    const styleUnderline = {
        borderBottom: "solid black 2px",
    }
    const styleNone = {
        borderBottom: "solid white 2px",
    }
    
    const [categoryState, setCategoryState] = useState(initialCategoryState);

    const setCategory = (cat) => {
        setCategoryState({ ...categoryState, [cat]: !categoryState[cat]});
    }

    const submitCategories = () => {
        let cats = Object.keys(categoryState).filter(key => categoryState[key] === true);
        let payload = {cats: cats, difficulty: difficultyState, timeValue: sliderState}
        startGame(payload);
        setCategoryState(initialCategoryState);
    }

    return (
        <div className="game">
            <div className="categoryDiv">
                {categories.map(cat => {
                    return (
                        <button className="categoryBtn" key={cat} onClick={() => setCategory(cat)}><p  style={categoryState[cat] ? styleUnderline : styleNone} >{cat}</p></button>
                    )
                })}
            </div>
            <div className="sliderDiv" >
                <input
                    type="range"
                    value={sliderState}
                    onChange={(e) => setSliderState(e.target.value)}
                    className="slider"
                    min="2"
                    max="14"
                />
                <h4 className="sliderValue">Timer Duration: {sliderState}s</h4>
            </div>
            <div className="difficultyDiv">
                <input
                    type="range"
                    value={difficultyState}
                    onChange={(e) => setDifficultyState(e.target.value)}
                    className="slider"
                    min="1"
                    max="4"
                />
                <h4 className="sliderValue">Difficulty: {difficultyState}</h4>
            </div>
            <button className="startBtn" onClick={submitCategories}>START</button>
        </div>
    )
}

export default Categories
