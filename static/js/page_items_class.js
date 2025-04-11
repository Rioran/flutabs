class PageItems {
    constructor() {
        this.grid = document.getElementById('flutabs-grid');  // table tag object for notes
        this.comments = null;  // upper row with comments, TODO
        this.note_heads = null;  // left sticky column with note names, TODO

        this.columns_amount = document.getElementById('addColumnsInput');
        this.transpose_amount = document.getElementById('transposeInput');
        this.melody_text = document.getElementById('melodyInput');

        this.melodies = document.getElementById('track-list');

        this.fill_melodies();
    }

    fill_melodies() {
        for (let i = 0; i < MELODIES.length; i++) {
            const melody = MELODIES[i];

            const tr_item = document.createElement('tr');

            const button_td_item = document.createElement('td');
            button_td_item.innerHTML = `<button onclick="flutabs.deploy_melody('${melody['melody']}');">${melody['name']}</button>`;
            tr_item.appendChild(button_td_item);

            const text_td_item = document.createElement('td');
            text_td_item.innerHTML = `${melody['description']}`;
            tr_item.appendChild(text_td_item);

            this.melodies.appendChild(tr_item);
        }
    }
}