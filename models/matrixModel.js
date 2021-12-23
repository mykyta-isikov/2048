function MatrixModel() {
    BaseModel.call(this);
    this.attributes = {
        grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        gameStatus: true
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
    this.attributes.gameStatus = true;
    this.createNewNumber();
    this.createNewNumber();
    this.publish('changeData');

    var summaryModel = new SummaryModel();
    if (summaryModel.attributes.totalScore > summaryModel.attributes.bestScore) {
        summaryModel.attributes.bestScore = summaryModel.attributes.totalScore;
    }
    summaryModel.attributes.totalScore = 0;
    summaryModel.publish('changeScore');
}

MatrixModel.prototype.moveUp = function () {
    if(!this.attributes.gameStatus) return;

    var newGrid = [];
    var rotatedGrid = this.attributes.grid.rotateMatrixCC();
    var score = 0;

    rotatedGrid.forEach(function (row) {
        calculatedRow = calculateRow(row)
        score += calculatedRow['score'];
        newGrid.push(calculatedRow['row']);
    });
    newGrid = newGrid.rotateMatrix();

    this.changeAndPublish(newGrid, score);
}

MatrixModel.prototype.moveRight = function () {
    if(!this.attributes.gameStatus) return;

    var newGrid = [];
    var rotatedGrid = this.attributes.grid.rotateMatrix().rotateMatrix();
    var score = 0;

    rotatedGrid.forEach(function (row) {
        calculatedRow = calculateRow(row)
        score += calculatedRow['score'];
        newGrid.push(calculatedRow['row']);
    });
    newGrid = newGrid.rotateMatrix().rotateMatrix();

    this.changeAndPublish(newGrid, score);
}

MatrixModel.prototype.moveDown = function () {
    if(!this.attributes.gameStatus) return;

    var newGrid = [];
    var rotatedGrid = this.attributes.grid.rotateMatrix();
    var score = 0;

    rotatedGrid.forEach(function (row) {
        calculatedRow = calculateRow(row)
        score += calculatedRow['score'];
        newGrid.push(calculatedRow['row']);
    });
    newGrid = newGrid.rotateMatrixCC();

    this.changeAndPublish(newGrid, score);
}

MatrixModel.prototype.moveLeft = function () {
    if(!this.attributes.gameStatus) return;

    var newGrid = [];
    var score = 0;

    this.attributes.grid.forEach(function (row) {
        calculatedRow = calculateRow(row)
        score += calculatedRow['score'];
        newGrid.push(calculatedRow['row']);
    });

    this.changeAndPublish(newGrid, score);
}
// Facade method
MatrixModel.prototype.changeAndPublish = function (calculatedMatrix, score) {
    var referenceString = this.attributes.grid.toString();
    var summaryModel = new SummaryModel();
    
    // Publish changes if grid changed
    this.attributes.grid = calculatedMatrix;
    if (referenceString !== calculatedMatrix.toString()) {
        this.createNewNumber();

        // Change and apply scoreboard
        if (score !== 0) {
            summaryModel.attributes.totalScore += score;
            summaryModel.publish('changeScore');
        } 

        // Checking win/loss
        if (this.checkWin()) {
            this.endGame('Victory!');
        } else if (!this.attributes.grid.checkZeroes()) {
            if (this.checkLoss()) {
                this.endGame('You\'ve lost...');
            }
        }

        if (!this.attributes.gameStatus) summaryModel.publish('changeScore');
        this.publish('changeData');
    }
}

MatrixModel.prototype.checkWin = function () {
    var i = 0;
    var j;
    for(; i < 4; i += 1) {
        j = 0;
        for(; j < 4; j += 1) {
            if(this.attributes.grid[i][j] === 11) return true;
        }
    }
    return false;
}

MatrixModel.prototype.checkLoss = function () {
    var matrixGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Copying MatrixModel grid to new variable
    var i = 0;
    var j;
    for(; i < 4; i += 1) {
        j = 0;
        for(; j < 4; j += 1) {
            matrixGrid[i][j] = this.attributes.grid[i][j];
        }
    }

    // Checking if possible moves exist
    var score = 0;

    matrixGrid.forEach(function (row) {
        calculatedRow = calculateRow(row)
        score += calculatedRow['score'];
    })
    matrixGrid = matrixGrid.rotateMatrix();
    matrixGrid.forEach(function (row) {
        calculatedRow = calculateRow(row)
        score += calculatedRow['score'];
    })

    if (score > 0) return false;
    return true;
}

MatrixModel.prototype.endGame = function (message) {
    this.attributes.gameStatus = false;
    this.attributes.endGameMessage = message;
    var summaryModel = new SummaryModel();
    if (summaryModel.attributes.totalScore > summaryModel.attributes.bestScore) {
        summaryModel.attributes.bestScore = summaryModel.attributes.totalScore;
    }
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
