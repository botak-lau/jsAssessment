//Find Your Hat JavaScript Assessment

const prompt = require('prompt-sync')({ sigint: true });


//Task 1 Create global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

//Task 2 Create Field Class
class Field {
    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;
    }

    //Task 3 Create generateField Method to generate the rows and columns
    generateField(percentage) {

        for (let y = 0; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {
                const prob = Math.random();
                this._field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        //Set the hat location: Object
        const hatlocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };

        while (hatlocation.x == 0 && hatlocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        }

        this._field[hatlocation.y][hatlocation.x] = hat;

        //Set the home position before the game starts
        this._field[0][0] = pathCharacter;

        
    }

    //Task 4 Create runGame, print, askQ Methods for the game
    runGame() {
        let playing = true;
        console.log("Let the GAME Begins!!!!!");

        while (playing) {
            this.print();       //print the field
            this.askQuestion();

            if (!this.isInside()) {
                console.log("You can't go there! Start all over again and stay within the field!!");
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Remove your shades! You went into the hole! Goodbye! ');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log("Congratulations! You found your hat! Don't leave it lying around again!");
                playing = false;
                break;
            }

            this._field[this._locationY][this._locationX] = pathCharacter;

        }
    }

    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    }

    askQuestion() {
        const direction = prompt('Where do you want to go? U-up, D-down, L-left, R-right').toUpperCase();
        switch (direction) {
            case "U":
                this._locationY -= 1;
                break;
            case "D":
                this._locationY += 1;
                break;
            case "L":
                this._locationX -= 1;
                break;
            case "R":
                this._locationX += 1;
                break;
            default:
                console.log("Butter fingers! Or you can't read? Stick to  U, D, L or R.");
                this.askQuestion();
                break;
        }
        
    }

    isInside() {
        return (
            this._locationY >= 0 &&
            this._locationX >= 0 &&
            this._locationY < this._field.length &&
            this._locationX < this._field[0].length
        );
    }

    isHat() {
        return this._field[this._locationY][this._locationX] === hat;
    }

    isHole() {
        return this._field[this._locationY][this._locationX] === hole;
    }
}




//Task 5 Instantiate field class to initialize constructor and generate rows and columns from the generatefield method

const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();