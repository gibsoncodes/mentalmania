import React from 'react'
import Categories from '../Game/Categories'
import Input from '../Game/Input'
import TitleDiv from '../Game/TitleDiv'


const AsComponent = ({divName, data}) => {
    return (
        <div className={divName}>
            {data}
        </div>
    )
}

const triDivs = [
    ["brrTri", "trrTri"],
    ["trlTri", "tlrTri"],
    ["tllTri", "bllTri"],
    ["blrTri", "brlTri"],
]

const MagicBorder = ({ titleState, borderState, gameProps}) => {
    const data = [];
    for (let i = 0; i < 4; i++) {
        let borderStyle = (i + 1) % 2 !== 0 ? "innerBorderVertical" : "innerBorderHorizontal";
        let bname = "border" + (i+1);
        let inners = [];
        let topInners = [];
        let bottomInners = [];

        for (let j = 0; j < 7; j++) {
            const divStyle = {
                backgroundColor: borderState[i+1][j],
            }
            inners.push(
                <div key={(j+1) * (i + 1) + "inner"} className={borderStyle} style={divStyle}></div>
            )
            topInners.push(
                <div key={j * i + j + "triTop"} className={borderStyle} style={divStyle}></div>
            )
            bottomInners.push(
                <div key={j * i + j + "triBot"} className={borderStyle} style={divStyle}></div>
            )
        }
        let outer = (
            <React.Fragment key={i + "outer"}>
                <AsComponent key={`${i}ttri`} divName={triDivs[i][0]} data={topInners}/>
                <div className={bname}>
                    {inners}
                </div>
                <AsComponent key={`${i}btri`} divName={triDivs[i][1]} data={bottomInners}/>
            </React.Fragment>
        )
        data.push(outer);  
    }
    let display = gameProps.gameState.playState;
    let _ = gameProps


    return (
        <div className="magicBorder" id="maniaBorder">  
            {data}
            <div className="mid" id="maniaMid">
                <TitleDiv colors={titleState} gameWon={false}/>    
                {display === "offline" ? <Categories startGame={_.startGame} handleSubmit={_.handleSubmit} timerState={_.timerState} setTimerState={_.setTimerState}/>: null }
                {display === "default" || display === "paused" ? <Input gameProps={gameProps} /> : null }
            </div>
        </div>
    )
};

export default MagicBorder
