import React, {useState, useEffect} from 'react'
import TitleDiv from '../Game/TitleDiv'


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const YouAreMathMonster = ({titleState, micros}) => {

    const data = micros.map((elem, index) => {
        let style = {
            backgroundColor: elem,
        }
        return (<div key={"victory" + index} className="victoryGridItem" style={style}></div>)
    })

    return (
        <div className="victoryDiv">
            {data}
            <TitleDiv colors={titleState} gameWon={true}/>
        </div>
    )
}

export default YouAreMathMonster
