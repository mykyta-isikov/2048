Array.prototype.checkZeroes = function () {
    var i = 0;
    var j;
    var hasZeroes = false;

    for(i; i < 4; i += 1) {
        j = 0;
        for(j; j < 4; j += 1) {
            if (this[i][j] === 0) {
                hasZeroes = true;
            };
        }
    }

    return hasZeroes;
}