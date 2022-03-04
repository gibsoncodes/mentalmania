import React from 'react'
import "./index.css"
import Game from '../Game'


const AsComponent = ({divName, data}) => {
    return (
        <div className={divName}>
            {data}
        </div>
    )
}

const TitleDiv = () => {
    return (
        <div className="titleDiv">
            <h2 className="title1 title">M</h2>
            <h2 className="title2 title">E</h2>
            <h2 className="title3 title">N</h2>
            <h2 className="title4 title">T</h2>
            <h2 className="title5 title">A</h2>
            <h2 className="title6 title">L</h2>
            <h2 className="title7 title">M</h2>
            <h2 className="title8 title">A</h2>
            <h2 className="title9 title">N</h2>
            <h2 className="title10 title">I</h2>
            <h2 className="title11 title">A</h2>
        </div>
    )
}

const triDivs = [
    ["brrTri", "trrTri"],
    ["trlTri", "tlrTri"],
    ["tllTri", "bllTri"],
    ["blrTri", "brlTri"],
]
const MagicBorder = ({borderState, gameProps}) => {
    const data = [];
    for (let i = 0; i < 4; i++) {
        let borderStyle = (i + 1) % 2 !== 0 ? "innerBorderVertical" : "innerBorderHorizontal";
        let bname = "border" + (i+1);
        let inners = [];
        for (let j = 0; j < 7; j++) {
            const divStyle = {
                backgroundColor: "#" + borderState[i+1][j],
            }
            inners.push(
                <div key={j * i + j} className={borderStyle} style={divStyle}></div>
            )
        }
        let outer = (
            <React.Fragment>
                <AsComponent key={`${i}ttri`} divName={triDivs[i][0]} data={inners}/>
                <div key={i} className={bname}>
                    {inners}
                </div>
                <AsComponent key={`${i}btri`} divName={triDivs[i][1]} data={inners}/>
            </React.Fragment>
        )
        data.push(outer);  
    }

    return (
        <div className="magicBorder">  
            {data}
            <div className="mid">
                <TitleDiv />          
                <Game gameProps={gameProps} />
            </div>
        </div>
    )
}

export default MagicBorder
