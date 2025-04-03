const table = document.querySelector('.flutabs-grid');
const notes = ['Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Si', 'Do'];
const grayedNotes = ['Do', 'Fa'];
const noteSymbol = '⬤';
const flatNoteSymbol = '◀';

let gridColumns = 0;
let octaves = 0;


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
            console.log('here')
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
