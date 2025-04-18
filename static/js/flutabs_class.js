class FluTabs {
    constructor() {
        this.items = new PageItems();
        this.melody = new Melody(this.items);
        this.grid = new Grid(this.items, this.melody);

        this.process_click = this.process_click.bind(this);
    }

    get_base_url() {
        return `${window.location.origin}${window.location.pathname}`;
    }

    reset_page() {
        window.location.href = this.get_base_url();
    }

    deploy_melody(melody_text) {
        this.items.melody_text.value = melody_text;
        this.melody.update_melody_from_input();
        this.grid.update();
    }

    transpose_by_value(value = 0) {
        this.melody.transpose(value);
        this.grid.update();
    }

    get_melody_text() {
        this.items.melody_text.value = this.melody.model_to_text();
    }

    melody_to_link() {
        const encoded_melody = encodeURIComponent(this.melody.melody_text);
        const link = `${this.get_base_url()}?melody=${encoded_melody}`;
        window.location.href = link;
    }

    melody_text_to_grid() {
        this.melody.update_melody_from_input();
        this.grid.update();
    }

    strip_melody() {
        this.melody.strip_melody();
        this.grid.update();
        this.get_melody_text();
    }

    process_click(event) {
        const cell = event.target;
    
        if (cell.tagName != "TD") {return;}
        
        const table = cell.parentNode.parentNode;
        const row = cell.parentNode.rowIndex;
        const col = cell.cellIndex;
        const cols_total = table.rows[0].cells.length;
    
        if (col == 0) {return;}
    
        if (cell.textContent == '') {
            if (event.shiftKey) {
                cell.textContent = FLAT_NOTE_SYMBOL;
            } else {
                cell.textContent = NATURAL_NOTE_SYMBOL;
            }
        } else if (cell.textContent == NATURAL_NOTE_SYMBOL) {
            const note = table.rows[row].firstElementChild.textContent;
    
            if (GRAYED_NOTES.includes(note)) {
                cell.textContent = '';
            } else {
                cell.textContent = FLAT_NOTE_SYMBOL;
            }
        } else if (cell.textContent == FLAT_NOTE_SYMBOL) {
            cell.textContent = '';
        }
    
        table.querySelectorAll("tr").forEach(row_item => {
            const cell = row_item.cells[col];
            if (cell.parentNode.rowIndex != row) {cell.textContent = '';}
        });
    
        if (col >= cols_total - 2) {
            this.grid.add_columns(2);
            window.scrollBy({'left': 200, 'behavior': 'smooth'});
        }

        const selection = window.getSelection();
        if (selection) {selection.removeAllRanges();}      

        this.melody.update_melody_from_grid();
    }

    process_columns_enter(event) {
        if (event.key === "Enter") {
            flutabs.grid.add_columns();
        }
    }
}