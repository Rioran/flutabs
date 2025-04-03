function initialize_grid(columns = 24) {
    const table = document.querySelector('.flutabs-grid');
    table.innerHTML = '';

    const rows = 8;
    const grayRows = [1, 5, 8];

    const tdElements = [];

    for (let col = 1; col <= columns; col++) {
        const td = document.createElement('td');
        tdElements.push(td.cloneNode());
    }

    for (let row = 1; row <= rows; row++) {
        const tableRow = document.createElement('tr');

        if (grayRows.includes(row)) {
            tableRow.classList.add('gray-row');
        }

        tdElements.forEach(td => tableRow.appendChild(td.cloneNode(true)));

        table.appendChild(tableRow);
    }
}
