import React, {useState} from 'react'
import Timer from './Timer';


const Categories = ({startGame, handleSubmit, timerState, setTimerState}) => {

    const categories = ["addition", "subtraction", "multiplication", "division", "algebra"];

    const initialCategoryState = {};
    categories.forEach(cat => initialCategoryState[cat] = false)
    
    const [categoryState, setCategoryState] = useState(initialCategoryState);

    const setCategory = (cat) => {
        setCategoryState({ ...categoryState, [cat]: !categoryState[cat]});
    }

    const submitCategories = () => {
        let payload = Object.keys(categoryState).filter(key => categoryState[key] === true);
        startGame(payload);
        setCategoryState(initialCategoryState);
    }

    return (
        <div>
            {categories.map(cat => {
                return <button key={cat} onClick={() => setCategory(cat)}>{cat}</button>;
            })}

            <button onClick={submitCategories}>
                <h2>Start Game</h2>
            </button>

            <Timer initialSeconds={5} handleSubmit={handleSubmit} timerState={timerState} setTimerState={setTimerState}/>

        </div>
    )
}

export default Categories
