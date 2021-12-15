Array.prototype.rotateMatrixCC = function () {
    var tempMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    var newMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    var i = 0;
    var j;

    for(i; i < 4; i += 1) {
        j = 0;
        for(j; j < 4; j += 1) {
            tempMatrix[i][j] = this[j][i];
        }
    }

    i = 0;
    for(i; i < 4; i += 1) {
        j = 0;
        for(j; j < 4; j += 1) {
            newMatrix[i][j] = tempMatrix[4-1-i][j];
        }
    }

    return newMatrix;
}