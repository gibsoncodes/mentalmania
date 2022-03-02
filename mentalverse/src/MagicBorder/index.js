import React, {useState, useEffect} from 'react'
import "./index.css"

const MagicBorder = ({borderState}) => {
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
            <div key={i} className={bname}>
                {inners}
            </div>
        )
        data.push(outer);  
    }

    return (
        <div className="magicBorder">
            {data}
        </div>
    )
}

export default MagicBorder
