function Controller() {
    this.matrixModel = new MatrixModel();
}

Controller.prototype.onClickNewGame = function () {
    this.matrixModel.hey();
}

Controller.prototype.onArrowUp = function () {
    this.matrixModel.moveUp();
}

Controller.prototype.onArrowRight = function () {
    this.matrixModel.moveRight();
}

Controller.prototype.onArrowDown = function () {
    this.matrixModel.moveDown();
}

Controller.prototype.onArrowLeft = function () {
    this.matrixModel.moveLeft();
}
