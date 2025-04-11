class PageItems {
    constructor() {
        this.grid = document.getElementById('flutabs-grid');  // table tag object for notes
        this.comments = null;  // upper row with comments, TODO
        this.note_heads = null;  // left sticky column with note names, TODO

        this.columns_amount = document.getElementById('addColumnsInput');
        this.transpose_amount = document.getElementById('transposeInput');
        this.melody_text = document.getElementById('melodyInput');
    }
}