const table = document.querySelector('.flutabs-grid');
const melodyInput = document.getElementById('melodyInput');
const transposeInput = document.getElementById('transposeInput');
const notes = ['Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Si', 'Do'];
const grayedNotes = ['Do', 'Fa'];
const flatNotesValues = [1, 3, 6, 8, 10];
const noteSymbol = '⬤';
const flatNoteSymbol = '◀';

let gridColumns = 0;
let octaves = 0;
let test = '';


const transposeMelody = () => {
    const transposeValue = parseInt(transposeInput.value, 10);
    const model = getMelodyModel();
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

    applyModelToGrid(model);
}


const applyModelToGrid = (model) => {
    model = trimModel(model);
    let topValue = 0;
    
    model.forEach((value) => {
        if (value !== null && value > topValue) {
            topValue = value;
        }
    });

    initializeGrid(model.length);

    while (topValue > (octaves + 1) * 12) {
        addOctave();
    }

    for (i = 0; i < model.length; i++) {
        if (model[i] === null) {continue;}

        const data = valueToNote(model[i]);
        const row = table.rows.length - data[0] - 1;
        const symbol = data[1];
        table.rows[row].cells[i + 1].textContent = symbol;
    }
}


const buildMelodyFromInput = () => {
    const model = deserialize();
    applyModelToGrid(model);
}


const trimModel = (model) => {
    let lastIndex = 0;

    for (i = model.length - 1; i > 0; i--) {
        if (model[i] !== null) {
            lastIndex = i;
            break;
        }
    }

    return model.slice(0, lastIndex + 1);
}


const deserialize = () => {
    const text = melodyInput.value;
    const textArray = text.split(", ");

    const result = textArray.map(value => {
        if (value === "") {return null;}
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? null : Math.abs(parsedValue);
    });

    return result;
}


const serialize = () => {
    const model = getMelodyModel();
    let text = '';

    model.forEach((value) => {
        text += value === null ? ', ' : `${value}, `;
    });

    melodyInput.value = text;
    melodyInput.select();
}

const valueToNote = (value) => {
    const octave = Math.floor(value / 12);
    let row = octave * 7;
    const remainder = value % 12;

    if (remainder == 0) {
        return [row, noteSymbol];
    }

    row += Math.floor((remainder + 1) / 2);
    // row += remainder >= 5 ? 1 : 0;
    const symbol = flatNotesValues.includes(remainder) ? flatNoteSymbol : noteSymbol;
    row += flatNotesValues.includes(remainder) && remainder > 5 ? 1 : 0;

    return [row, symbol];
}


const noteToValue = (tableRows, row, symbol) => {
    const reverseRow = tableRows - 1 - row;  // count value by notes from below

    let noteValue = reverseRow * 2;  // base value to subtract from it later
    noteValue -= Math.floor(reverseRow / 7);  // times Do steal the semitone
    noteValue -= Math.floor((reverseRow + 4) / 7);  // times Fa steal the semitone
    noteValue -= symbol == noteSymbol ? 0 : 1;  // flatNoteSymbol steals the last semitone

    return noteValue;
}


const getMelodyModel = () => {
    let model = [];
    const tableRows = table.rows.length;

    for (col = 1; col < table.rows[0].cells.length; col++) {
        let loopedAllRows = true;

        for (row = tableRows - 1; row >= 0; row--) {
            const text = table.rows[row].cells[col].textContent;

            if (text == '') {continue;}

            model.push(noteToValue(tableRows, row, text));
            loopedAllRows = false;

            break;
        }

        if (loopedAllRows) {
            model.push(null);
        }
    }

    return model;
}


const addColumns = (columns = 4) => {
	const rows = document.querySelectorAll("table.flutabs-grid tr");

	rows.forEach((row) => {
		for (let column = 1; column <= columns; column++) {
			row.appendChild(row.lastElementChild.cloneNode(true));
            row.lastElementChild.textContent = '';
		}
	});

    gridColumns += columns;
}


const addOctave = () => {
    octaves += 1;

    for (let row = 1; row < notes.length; row++) {
        const note = notes[row];
        const isGray = grayedNotes.includes(note);
        const tableRow = document.createElement('tr');

        for (let col = 0; col < gridColumns; col++) {
            cell = document.createElement('td');

            if (col == 0) {
                cell.textContent = note; // + '-' + (row == notes.length - 1 ? octaves + 1 : octaves);
                cell.classList.add('sticky-col');
            }

            if (isGray) {
                cell.classList.add('gray-row');
            }

            tableRow.appendChild(cell);
        }

        table.insertBefore(tableRow, table.rows[0]);
    }
}


const initializeGrid = (initialColumns = 12) => {
    table.innerHTML = '';

    const rowHead = document.createElement('td');
    rowHead.classList.add('sticky-col');

    const tdElements = [];
    tdElements.push(rowHead);

    for (let col = 1; col <= initialColumns; col++) {
        const td = document.createElement('td');
        tdElements.push(td);
    }

    for (let row = 1; row <= notes.length; row++) {
        const tableRow = document.createElement('tr');
        const note = notes[notes.length - row];

        tdElements.forEach(td => tableRow.appendChild(td.cloneNode(true)));
        tableRow.firstElementChild.textContent = note; // + '-' + (row == 1 ? octaves + 1 : octaves);

        if (grayedNotes.includes(note)) {
            tableRow.classList.add('gray-row');
        }

        table.appendChild(tableRow);
    }

    gridColumns = initialColumns + 1;
    octaves = 0;
}

const setupPage = () => {
    initializeGrid();
    
    table.addEventListener("click", (event) => {
        const cell = event.target;

        if (cell.tagName != "TD") {return;}
        
        const row = cell.parentNode.rowIndex;
        const col = cell.cellIndex;

        if (col == 0) {return;}

        if (cell.textContent == '') {
            cell.textContent = noteSymbol;
        } else if (cell.textContent == noteSymbol) {
            const note = table.rows[row].firstElementChild.textContent;

            if (grayedNotes.includes(note)) {
                cell.textContent = '';
            } else {
                cell.textContent = flatNoteSymbol;
            }
        } else if (cell.textContent == flatNoteSymbol) {
            cell.textContent = '';
        }

        table.querySelectorAll("tr").forEach(row_item => {
            const cell = row_item.cells[col];

            if (cell.parentNode.rowIndex != row) {
                cell.textContent = '';
            }
        });
          
    });
}
