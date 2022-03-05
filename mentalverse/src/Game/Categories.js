import React, {useState} from 'react'
// import Timer from '../Timer';


const Categories = ({startGame, handleSubmit, timerState, setTimerState}) => {

    const categories = ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION", "ALGEBRA"];

    const initialCategoryState = {};
    categories.forEach(cat => initialCategoryState[cat] = false)

    const styleUnderline = {
        borderBottom: "solid black 2px",
    }
    
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
            <div className="categoryDiv">
                {categories.map(cat => {
                    return <button className="categoryBtn" key={cat} onClick={() => setCategory(cat)}><p  style={categoryState[cat] ? styleUnderline : null}className="btnText">{cat}</p></button>;
                })}
            </div>

            <button className="startBtn" onClick={submitCategories}>START</button>

            {/* <Timer initialSeconds={5} handleSubmit={handleSubmit} timerState={timerState} setTimerState={setTimerState}/> */}

        </div>
    )
}

export default Categories
