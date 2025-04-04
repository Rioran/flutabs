const table = document.getElementById('flutabs-grid');
const melodyInput = document.getElementById('melodyInput');
const transposeInput = document.getElementById('transposeInput');

let gridColumns = 0;
let octaves = 0;
let test = '';


const deployKnownMelody = (melodyName) => {
    const melodyText = MELODIES[melodyName];
    melodyInput.value = melodyText;
    buildMelodyFromInput();
}


const transposeMelody = () => {
    const transposeValue = parseInt(transposeInput.value, 10);
    transposeMelodyByValue(transposeValue);
}


const transposeMelodyByValue = (transposeValue) => {
    const model = getMelodyModel();
    const transposedModel = transposeModel(model, transposeValue);
    applyModelToGrid(transposedModel);
}


const applyModelToGrid = (model) => {
    model = stripModel(model);
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
    const model = deserialize(melodyInput.value);
    applyModelToGrid(model);
}


const getMelodyText = () => {
    const model = getMelodyModel();
    const text = serialize(model);

    melodyInput.value = text;
    melodyInput.select();
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


const addColumns = (columns = 6) => {
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
        tableRow.classList.add('flutabs-grid');

        for (let col = 0; col < gridColumns; col++) {
            cell = document.createElement('td');
            cell.classList.add('flutabs-grid');

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
    rowHead.classList.add('sticky-col', 'flutabs-grid');

    const tdElements = [];
    tdElements.push(rowHead);

    for (let col = 1; col <= initialColumns; col++) {
        const td = document.createElement('td');
        td.classList.add('flutabs-grid');
        tdElements.push(td);
    }

    for (let row = 1; row <= notes.length; row++) {
        const tableRow = document.createElement('tr');
        tableRow.classList.add('flutabs-grid');
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
        const totalCols = table.rows[0].cells.length;

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

        if (col >= totalCols - 2) {
            addColumns(2);
        }
    });
}
