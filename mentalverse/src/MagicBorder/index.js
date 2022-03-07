import React from 'react'
import Game from '../Game/Game'
import Input from '../Game/Input'


const AsComponent = ({divName, data}) => {
    return (
        <div className={divName}>
            {data}
        </div>
    )
}

const TitleDiv = ({colors}) => {
    const titleString = ["M", "E", "N", "T", "A", "L", "M", "A", "N", "I", "A"];
    return (
        <div className="titleDiv" id="maniaTitle">
            {titleString.map((char, index) => {
                let style = {
                    color: colors[index],
                }
                return <h2 key={char + index} className="title" style={style}>{char}</h2>
            })}
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
    console.log(borderState)
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
                <div key={j * i + j} className={borderStyle} style={divStyle}></div>
            )
            topInners.push(
                <div key={j * i + j + "triTop"} className={borderStyle} style={divStyle}></div>
            )
            bottomInners.push(
                <div key={j * i + j + "triBot"} className={borderStyle} style={divStyle}></div>
            )
        }
        let outer = (
            <React.Fragment>
                <AsComponent key={`${i}ttri`} divName={triDivs[i][0]} data={topInners}/>
                <div key={i} className={bname}>
                    {inners}
                </div>
                <AsComponent key={`${i}btri`} divName={triDivs[i][1]} data={bottomInners}/>
            </React.Fragment>
        )
        data.push(outer);  
    }
    let display = gameProps.gameState.playState;


    return (
        <div className="magicBorder" id="maniaBorder">  
            {data}
            <div className="mid" id="maniaMid">
                <TitleDiv colors={titleState}/>    
                {display === "offline" ? <Game gameProps={gameProps} /> : null }
                {display === "default" || display === "paused" ? <Input gameProps={gameProps} /> : null }
                <button onClick={(e) => gameProps.toggleGame(e)}>Pause Game</button>

            </div>
        </div>
    )
};

export default MagicBorder
