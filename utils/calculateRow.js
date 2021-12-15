function calculateRow(row) {
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
        if(filteredRow[elemPointer] === filteredRow[elemPointer + 1]) {
            calculatedRow.push(filteredRow[elemPointer] + 1);
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

    return calculatedRow;
}