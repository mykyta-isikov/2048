function calculateRow(row) {
    // error handlers
    if (row === undefined) {
        throw new Error('argument "row" is mandatory.')
    }

    // getting rid of zeroes
    var filteredRow = row.filter(function (elem) { if(elem !== 0) return elem });
    // calculating element "merges"
    var calculatedRow = [];
    var elemPointer = 0;
    var totalScore = 0;

    while(elemPointer < filteredRow.length) {
        if(filteredRow[elemPointer] === filteredRow[elemPointer + 1]) {
            calculatedRow.push(filteredRow[elemPointer] + 1);
            totalScore += Math.pow(2, filteredRow[elemPointer] + 1);
            //if merged with next element, skip it
            elemPointer += 1;
        } else {
            calculatedRow.push(filteredRow[elemPointer]);
        }
        elemPointer += 1;
        
    }

    // adding zeroes
    while(calculatedRow.length < 4) {
        calculatedRow.push(0);
    }

    return {
        row: calculatedRow,
        score: totalScore
    }
}