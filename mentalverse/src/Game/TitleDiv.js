const TitleDiv = ({colors, gameWon}) => {
    const titleString = ["M", "E", "N", "T", "A", "L", "M", "A", "N", "I", "A"];
    const classes = {
        titleDiv: "titleDiv",
        title: "title"
    }
    if (gameWon) {
        classes.title = "titleWon"
        classes.titleDiv = "titleDivWon"
    }
    return (
        <div className={classes.titleDiv} id="maniaTitle">
            {titleString.map((char, index) => {
                let style = {
                    color: colors[index],
                }
                
                return <h2 key={char + index} className={classes.title} style={style}>{char}</h2>
            })}
        </div>
    )
}

export default TitleDiv
