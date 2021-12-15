function MatrixModel() {
    BaseModel.call(this);
    this.attributes = {
        grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
    }
    
    // singleton
    var instance = this;
    MatrixModel = function () {
        return instance;
    }
}

MatrixModel.prototype = Object.create(BaseModel.prototype);
MatrixModel.prototype.constructor = MatrixModel;

MatrixModel.prototype.hey = function () {
    this.attributes.grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    this.createNewNumber();
    this.createNewNumber();
    this.publish('changeData');
}

MatrixModel.prototype.moveUp = function () {
    var newGrid = [];
    var rotatedGrid = this.attributes.grid.rotateMatrix();

    rotatedGrid.forEach((row) => {
        newGrid.push(calculateReverseRow(row));
    })

    newGrid = newGrid.rotateMatrixCC();

    this.changeAndPublish(newGrid);
}

MatrixModel.prototype.moveRight = function () {
    var newGrid = [];

    this.attributes.grid.forEach((row) => {
        newGrid.push(calculateReverseRow(row));
    })

    this.changeAndPublish(newGrid);
}

MatrixModel.prototype.moveDown = function () {
    var newGrid = [];
    var rotatedGrid = this.attributes.grid.rotateMatrix();

    rotatedGrid.forEach((row) => {
        newGrid.push(calculateRow(row));
    })

    newGrid = newGrid.rotateMatrixCC();

    this.changeAndPublish(newGrid);
}

MatrixModel.prototype.moveLeft = function () {
    var newGrid = [];

    this.attributes.grid.forEach((row) => {
        newGrid.push(calculateRow(row));
    })

    this.changeAndPublish(newGrid);
}
// Facade method
MatrixModel.prototype.changeAndPublish = function (calculatedMatrix) {
    var referenceString = this.attributes.grid.toString();
    this.attributes.grid = calculatedMatrix;
    if (referenceString !== calculatedMatrix.toString()) {
        this.createNewNumber();
    }
    this.publish('changeData');
}

MatrixModel.prototype.createNewNumber = function () {
    var zeroPosList = [];
    var i = 0;
    var j;

    // Getting array of coords with value "0"
    for(i; i < 4; i += 1) {
        j = 0;
        for(j; j < 4; j += 1) {
            if (this.attributes.grid[i][j] === 0) {
                zeroPosList.push([i, j]);
            }

        }
    }

    // Randomizing
    var randomIndex = Math.floor(Math.random()*(zeroPosList.length));
    var y = zeroPosList[randomIndex][0];
    var x = zeroPosList[randomIndex][1];
    var randomValue = Math.random()*10;

    // Output
    if (randomValue <= 1) {
        this.attributes.grid[y][x] = 2;
    } else {
        this.attributes.grid[y][x] = 1;
    }
}






















// https://github.com/lorapalmer/2048
