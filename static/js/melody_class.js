class Melody {
    constructor(page_items) {
        this.items = page_items;
        this.name = null;  // melody name to be presented, TODO
        this.description = null;  // melody related text, TODO
        this.melody_text = this.parse_melody_from_link();
        this.melody_model = this.text_to_model();  // list of integers and nulls

        this.top_value = null;
        this.bottom_value = null;
        this.octaves = null;

        this.update_melody();

        if (this.melody_text !== null) {this.items.melody_text.value = this.melody_text}
    }

    update_melody() {
        this.top_value = Math.max(...this.melody_model.filter(item => item !== null));
        this.bottom_value = Math.min(...this.melody_model.filter(item => item !== null));
        this.octaves = 1;

        if (this.top_value > 0) {
            this.octaves = Math.floor(this.top_value / 12) + 1;
            if (this.top_value % 12 == 0) {this.octaves--;}
        }

        console.log(`melody melody_model = ${this.melody_model}`);
        console.log(`melody top_value = ${this.top_value}`);
        console.log(`melody bottom_value = ${this.bottom_value}`);
        console.log(`melody octaves = ${this.octaves}`);
    }
    
    update_melody_from_input() {
        this.melody_text = this.items.melody_text.value;
        this.melody_model = this.text_to_model();
        this.update_melody();
    }

    update_melody_from_grid() {
        this.melody_model = [];
        const rows_count = this.items.grid.rows.length;
    
        for (let col = 1; col < this.items.grid.rows[0].cells.length; col++) {
            let looped_all_rows = true;
    
            for (let row = rows_count - 1; row >= 0; row--) {
                const text = this.items.grid.rows[row].cells[col].textContent;
    
                if (text == '') {continue;}
    
                this.melody_model.push(this.note_to_value(rows_count, row, text));
                looped_all_rows = false;
    
                break;
            }
    
            if (looped_all_rows) {
                this.melody_model.push(null);
            }
        }
        this.melody_text = this.model_to_text();
        this.update_melody();
    }

    parse_melody_from_link() {
        const link = window.location.href;
        const parameters = new URL(link).searchParams;
        return parameters.get('melody');
    }

    text_to_model() {
        if (this.melody_text === null || this.melody_text == '') {
            return Array(DEFAULT_GRID_COLUMNS_COUNT).fill(null);
        }
        
        const text_array = this.melody_text.split(",");

        return text_array.map(value => {
            if (value === "") {return null;}
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? null : Math.abs(parsedValue);
        });
    }
    
    model_to_text() {
        let text = '';

        this.melody_model.forEach((value) => {
            text += value === null ? ',' : `${value},`;
        });

        if (text.length > 1) {text = text.slice(0, -1);}

        return text;
    }

    strip_model(model) {
        const first_index = model.findIndex(item => item !== null);
        const last_index = model.findLastIndex(item => item !== null);
    
        return model.slice(first_index, last_index + 1);
    }

    strip_melody() {
        this.melody_model = this.strip_model(this.melody_model);
        this.melody_text = this.model_to_text();
        this.update_melody();
    }

    transpose(value = 0) {
        if (value == 0) {
            value = parseInt(this.items.transpose_amount.value, 10);
        }
        let new_bottom = this.bottom_value + value;
        let correction = value;

        if (new_bottom >= 12) {correction -= 12 * Math.floor(new_bottom / 12);}
        else if (new_bottom < 0) {
            correction += 12 * (Math.floor(Math.abs(new_bottom) / 12) + 1);
            if (new_bottom % 12 == 0) {correction -= 12;}
        }

        for (let i = 0; i < this.melody_model.length; i++) {
            if (this.melody_model[i] === null) {continue;}
            this.melody_model[i] += correction;
        }
        this.melody_text = this.model_to_text();
        this.update_melody();
    }

    get_row_by_note_value(value) {
        let row = Math.floor(value / 12) * 7;
        const remainder = value % 12;

        if (remainder == 0) {return row;}

        row += Math.floor((remainder + 1) / 2);
        row += FLAT_NOTES_VALUES.includes(remainder) && remainder > 5 ? 1 : 0;

        return row;
    }

    get_symbol_by_note_value(value) {
        return NOTE_SYMBOLS[value % 12];
    }

    note_to_value = (rows_count, row, symbol) => {
        const reverse_row = rows_count - 1 - row;  // count value by notes from below
    
        let note_value = reverse_row * 2;  // base value to subtract from it later
        note_value -= Math.floor(reverse_row / 7);  // times Do steal the semitone
        note_value -= Math.floor((reverse_row + 4) / 7);  // times Fa steal the semitone
        note_value -= symbol == NATURAL_NOTE_SYMBOL ? 0 : 1;  // flat Note Symbol steals the last semitone
    
        return note_value;
    }
}