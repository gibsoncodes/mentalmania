function toFraction(x, tolerance) {
    if (x == 0) return [0, 1];
    if (x < 0) x = -x;
    if (!tolerance) tolerance = 0.0001;
    var num = 1, den = 1;

    function iterate() {
        var R = num/den;
        if (Math.abs((R-x)/x) < tolerance) return;

        if (R < x) num++;
        else den++;
        iterate();
    }

    iterate();
    return {numerator: num, denominator: den};
}

class NewGame {
    constructor() {
        this.score = {
            right: 0,
            wrong: 0,
        }
        this.currentProblem = {};
        this.gameProblemSet = [];
        this.gameCategories = [];
    }

    addCategories(categories, difficulty) {
        difficulty = parseInt(difficulty);
        categories.forEach(category => {
            switch (category) {
                case "ADDITION":
                    this.gameCategories.push(new AdditionAndSubtraction(difficulty, 'addition'));
                    break;
                case "SUBTRACTION":
                    this.gameCategories.push(new AdditionAndSubtraction(difficulty, 'subtraction'));
                    break;
                case "MULTIPLICATION":
                    this.gameCategories.push(new Multiplication(difficulty));
                    break;
                case "DIVISION":
                    this.gameCategories.push(new Division(difficulty));
                    break;
                case "ALGEBRA":
                    this.gameCategories.push(new Algebra(difficulty));
                    break;
                default:
                    console.log("no category added");
            }
        })
    }

    generateProblem() {
        let rand = Math.floor(Math.random() * this.gameCategories.length);
        this.currentProblem = this.gameCategories[rand].serveProblem();
    }

    serveProblem() {
        this.generateProblem();
        return this.currentProblem;
    }

    handleUserInput(input) {
        let newProblem = {
            equation: this.currentProblem.equation, 
            answer: this.currentProblem.answer
        };

        if (input == this.currentProblem.answer) {
            this.gameProblemSet.push(
                {
                    problem: newProblem,
                    solved: true,
                    userAnswer: input,
                }
            );
            return true;
        } else {
            this.gameProblemSet.push(
                {
                    problem: newProblem,
                    solved: false,
                    userAnswer: input,
                }
            );
            return false;
        }

    }

    getPlaySet() {
        return this.gameProblemSet;
    }
}

class Multiplication {
    constructor(difficulty) {
        this.problem = {
            answer: 0,
            equation: "",
        }
        this.difficulty = difficulty;
        this.maxOperator = 0;
        this.minOperator = 0;
        this.setValues()
    }

    setValues() {
        switch (this.difficulty) {
            case 2: 
                this.maxOperator = 20;
                this.minOperator = 2;
                break;
            case 3: 
                this.maxOperator = 50;
                this.minOperator = 3;
                break;
            case 4: 
                this.maxOperator = 100;
                this.minOperator = 15;
                break;
            default: 
                this.maxOperator = 12;
                this.minOperator = 0;       
        }
    }

    generateProblem() {
        let x = Math.floor(Math.random() * (this.maxOperator - this.minOperator + 1) + this.minOperator); 
        let y = Math.floor(Math.random() * (this.maxOperator - this.minOperator + 1) + this.minOperator); 
        this.problem.answer = x * y;
        this.problem.equation = `${x} * ${y}`;
    }

    serveProblem() {
        this.generateProblem()
        return this.problem;
    }

}

class AdditionAndSubtraction {
    constructor(difficulty, ternary) {
        this.problem = {
            answer: 0,
            equation: "",
        }
        ternary === "addition" ? this.ternary = true : this.ternary = false;
        this.difficulty = difficulty;
        this.setValues()
    }

    setValues() {
        switch (this.difficulty) {
            case 2: 
                this.maxOperator = 100;
                this.minOperator = 1;
                break;
            case 3: 
                this.maxOperator = 500;
                this.minOperator = 51;
                break;
            case 4: 
                this.maxOperator = 10000;
                this.minOperator = 501;
                break;
            default: 
                this.maxOperator = 25;
                this.minOperator = 0;       
        }
    }

    generateProblem() {
        let x = Math.floor(Math.random() * (this.maxOperator - this.minOperator + 1) + this.minOperator); 
        let y = Math.floor(Math.random() * (this.maxOperator - this.minOperator + 1) + this.minOperator); 
        this.problem.answer = this.ternary ? x + y : x - y;
        this.problem.equation = `${x} ${this.ternary ? '+' : '-'} ${y}`;
    }

    serveProblem() {
        this.generateProblem()
        return this.problem;
    }
}

class Division {
    constructor(difficulty) {
        this.problem = {
            answer: 0,
            equation: "",
        }
        this.problemSet = [];
        this.difficulty = difficulty;
        this.setValues()
    }

    setValues() {
        switch (this.difficulty) {
            case 2: 
                this.compileNumberSet(2, 50, 2)
                break;
            case 3: 
                this.compileNumberSet(2, 100, 3)
                break;
            case 4: 
                this.compileNumberSet(2, 200, 3)
                break;
            default: 
                this.compileNumberSet(2, 50, 1)
 
        }
    }

    compileNumberSet(min, max, diff) {
        let countDecimals = function(value) {
            if (Math.floor(value) !== value)
                return value.toString().split(".")[1].length || 0;
            return 0;
        }
        for (let i = min; i < max; i++) {
            for (let j = i + 1; j <= max; j++) {
                let temp = countDecimals((j / i))
                if (temp <= diff - 1) {
                    this.problemSet.push([j,i]);
                }
            }
        }
    }

    generateProblem() {
        let rand = Math.floor(Math.random() * this.problemSet.length);
        let prob = this.problemSet[rand];
        this.problem.answer = prob[0] / prob[1];
        this.problem.equation = `${prob[0]} / ${prob[1]}`;
    }

    serveProblem() {
        this.generateProblem()
        return this.problem;
    }
}

class Algebra {
    constructor(difficulty) {
        this.problem = {
            answer: 0,
            equation: "",
        }
        this.problemSet = [];
        this.difficulty = difficulty;
        this.setValues()
    }

    setValues() {
        switch (this.difficulty) {
            case 2: 
                this.compileNumberSet(2, 50, 1)
                break;
            case 3: 
                this.compileNumberSet(2, 100, 2)
                break;
            case 4: 
                this.compileNumberSet(2, 200, 3)
                break;
            default: 
                this.compileNumberSet(2, 20, 1)
 
        }
    }

    compileNumberSet(min, max, diff) {
        let countDecimals = function(value) {
            if (Math.floor(value) !== value)
                return value.toString().split(".")[1].length || 0;
            return 0;
        }

        while (this.problemSet.length < 200) {
            let newProblem = {};

            let equalsTo;
            let leftSide;
            let coefficient = 1


            let coRand = Math.floor(Math.random() * max) + 1;
            let opRand = Math.floor(Math.random() * 2);

            coefficient = opRand === 1 ? coefficient * coRand : coefficient / coRand;


            let acquireProblem = 0;
            if (coefficient > 1) {
                while (acquireProblem < 1) {
                    let rand = Math.floor(Math.random() * max) + 1;
                    let temp = countDecimals((rand / toFraction(coefficient).numerator))
                    if (temp <= diff - 1) {
                        equalsTo = rand;
                        acquireProblem++;
                    }
                }
            } else {
                let rand = Math.floor(Math.random() * max) + 1;
                equalsTo = rand;
            }

            coefficient = toFraction(coefficient);


            let splitRand = Math.floor(Math.random() * equalsTo - 1) + 1;
            opRand = Math.floor(Math.random() * 2);

            if (opRand === 1) {
                leftSide = splitRand;
                equalsTo -= splitRand
                if (coefficient.numerator > coefficient.denominator) {
                    newProblem.equation = `${coefficient.numerator}x - ${leftSide} = ${equalsTo}`;
                    newProblem.answer = (equalsTo + leftSide) / coefficient.numerator;
                } else {
                    newProblem.equation = `${coefficient.numerator}/${coefficient.denominator}x - ${leftSide} = ${equalsTo}`;
                    newProblem.answer = (equalsTo + leftSide) * coefficient.denominator;
                }

            } else {
                leftSide = splitRand;
                equalsTo += splitRand
                if (coefficient.numerator > coefficient.denominator) {
                    newProblem.equation = `${coefficient.numerator}x + ${leftSide} = ${equalsTo}`;
                    newProblem.answer = (equalsTo - leftSide) / coefficient.numerator;
                } else {
                    newProblem.equation = `${coefficient.numerator}/${coefficient.denominator}x + ${leftSide} = ${equalsTo}`;
                    newProblem.answer = (equalsTo - leftSide) * coefficient.denominator;
                }
            }

            this.problemSet.push(newProblem);
        }   


    }

    generateProblem() {
        let rand = Math.floor(Math.random() * this.problemSet.length);
        let prob = this.problemSet[rand];
        this.problem.answer = prob.answer;
        this.problem.equation = prob.equation;
    }

    serveProblem() {
        this.generateProblem()
        return this.problem;
    }
}

// let test = new Algebra(0);
// test.generateProblem()
// console.log(test.problemSet)
// console.log(toFraction((1/13)));

export default NewGame;