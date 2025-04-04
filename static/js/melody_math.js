/*
Current file revolves around the "model" idea - 
a list of ints and nulls representing the melody.
*/


/*
Delete null from start and end of the model.
*/
const stripModel = (model) => {
    let lastIndex = 0;
    let firstIndex = 0;

    for (let i = 0; i < model.length; i++) {
        if (model[i] !== null) {
            firstIndex = i;
            break;
        }
    }

    for (let i = model.length - 1; i > 0; i--) {
        if (model[i] !== null) {
            lastIndex = i;
            break;
        }
    }

    return model.slice(firstIndex, lastIndex + 1);
}


/*
Convert text representing melody in seminotes
to a model - list of integers and null's.
*/
const deserialize = (text) => {
    const textArray = text.split(", ");

    return textArray.map(value => {
        if (value === "") {return null;}
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? null : Math.abs(parsedValue);
    });
}


const serialize = (model) => {
    let text = '';

    model.forEach((value) => {
        text += value === null ? ', ' : `${value}, `;
    });

    return text;
}


const noteToValue = (tableRows, row, symbol) => {
    const reverseRow = tableRows - 1 - row;  // count value by notes from below

    let noteValue = reverseRow * 2;  // base value to subtract from it later
    noteValue -= Math.floor(reverseRow / 7);  // times Do steal the semitone
    noteValue -= Math.floor((reverseRow + 4) / 7);  // times Fa steal the semitone
    noteValue -= symbol == noteSymbol ? 0 : 1;  // flatNoteSymbol steals the last semitone

    return noteValue;
}


const valueToNote = (value) => {
    const octave = Math.floor(value / 12);
    let row = octave * 7;
    const remainder = value % 12;

    if (remainder == 0) {
        return [row, noteSymbol];
    }

    row += Math.floor((remainder + 1) / 2);
    const symbol = flatNotesValues.includes(remainder) ? flatNoteSymbol : noteSymbol;
    row += flatNotesValues.includes(remainder) && remainder > 5 ? 1 : 0;

    return [row, symbol];
}


const transposeModel = (model, transposeValue) => {
    let lowestValue = 0;
    let correction = 0;

    for (i = 0; i < model.length; i++) {
        if (model[i] === null) {continue;}

        model[i] += transposeValue;

        if (model[i] < lowestValue) {
            lowestValue = model[i];
        }
    }

    while (lowestValue < 0) {
        lowestValue += 12;
        correction += 12;
    }

    if (correction != 0) {
        for (i = 0; i < model.length; i++) {
            if (model[i] === null) {continue;}
    
            model[i] += correction;
        }
    }

    return model;
}

