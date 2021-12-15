function calculateReverseRow(row) {
    // error handlers
    if (row === undefined) {
        throw new Error('argument "row" is mandatory.')
    }

    // getting rid of zeroes
    var filteredRow = row.filter(elem => elem !== 0);

    // calculating element "merges"
    var calculatedRow = [];
    var elemPointer = 0;

    while(elemPointer < filteredRow.length) {
        var i = filteredRow.length - elemPointer - 1;
        if(filteredRow[i] === filteredRow[i - 1]) {
            calculatedRow.unshift(filteredRow[i] + 1);
            //if merged with next element, skip it
            elemPointer += 1;
        } else {
            calculatedRow.unshift(filteredRow[i]);
        }
        elemPointer += 1;
    }

    // adding zeroes
    while(calculatedRow.length < 4) {
        calculatedRow.unshift(0);
    }

    return calculatedRow;
}