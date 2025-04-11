class Grid {
    constructor(items, melody) {
        this.items = items;
        this.grid = this.items.grid;  // table tag object
        this.melody = melody;

        this.update();
    }

    update() {
        this.build();
        this.fill();
    }

    build() {
        while (this.grid.rows.length > 0) {this.grid.deleteRow(0);}
        
        const row_head = document.createElement('td');
        row_head.classList.add('sticky-col', 'flutabs-grid');
    
        const td_items = [];
        td_items.push(row_head);

        let note_i = NOTES_LABELS.length;
    
        for (let col = 1; col <= this.melody.melody_model.length; col++) {
            const td_item = document.createElement('td');
            td_item.classList.add('flutabs-grid');
            td_items.push(td_item);
        }
    
        for (let row = 1; row <= this.melody.octaves * 7 + 1; row++) {  // 7 notes per octave to show
            const tr_item = document.createElement('tr');
            tr_item.classList.add('flutabs-grid');
    
            td_items.forEach(td_item => tr_item.appendChild(td_item.cloneNode(true)));
            const note = NOTES_LABELS[--note_i];
            if (note_i == 1) {note_i = NOTES_LABELS.length;}
            tr_item.firstElementChild.textContent = note;
    
            if (GRAYED_NOTES.includes(note)) {tr_item.classList.add('gray-row');}
    
            this.grid.appendChild(tr_item);
        }
    }

    fill() {
        for (let i = 0; i < this.melody.melody_model.length; i++) {
            if (this.melody.melody_model[i] === null) {continue;}
            const note_value = this.melody.melody_model[i];
            const row = this.grid.rows.length - this.melody.get_row_by_note_value(note_value) - 1;
            const symbol = this.melody.get_symbol_by_note_value(note_value);
            this.grid.rows[row].cells[i + 1].textContent = symbol;
        }
    }

    add_octave() {
        for (let row = 1; row < NOTES_LABELS.length; row++) {
            const note = NOTES_LABELS[row];
            const is_gray = GRAYED_NOTES.includes(note);
            const tr_item = document.createElement('tr');
            tr_item.classList.add('flutabs-grid');

            for (let col = 0; col <= this.melody.melody_model.length; col++) {
                const td_item = document.createElement('td');
                td_item.classList.add('flutabs-grid');

                if (col == 0) {
                    td_item.textContent = note;
                    td_item.classList.add('sticky-col');
                }

                if (is_gray) {td_item.classList.add('gray-row');}

                tr_item.appendChild(td_item);
            }

            this.grid.insertBefore(tr_item, this.grid.rows[0]);
        }
        
        this.melody.update_melody_from_grid();
    }

    add_columns(columns = 0) {
        if (columns == 0) {
            columns = parseInt(this.items.columns_amount.value, 10);
        }

        const rows = document.querySelectorAll("table.flutabs-grid tr");

        rows.forEach((row) => {
            for (let column = 1; column <= columns; column++) {
                row.appendChild(row.lastElementChild.cloneNode(true));
                row.lastElementChild.textContent = '';
            }
        });

        this.melody.update_melody_from_grid();
    }

    remove_columns(columns = 0) {
        if (columns == 0) {
            columns = parseInt(this.items.columns_amount.value, 10);
        }

        const rows = document.querySelectorAll("table.flutabs-grid tr");
        const columns_count = this.grid.rows[0].cells.length;

        rows.forEach((row) => {
            for (let step = 1; step <= columns && columns_count - step > 1; step++) {
                row.deleteCell(columns_count - step);
            }
        });

        this.melody.update_melody_from_grid();
    }
}