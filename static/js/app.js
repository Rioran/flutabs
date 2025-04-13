const flutabs = new FluTabs();

flutabs.items.grid.addEventListener("click", flutabs.process_click);

flutabs.items.columns_amount.addEventListener("keydown", flutabs.process_columns_enter);

document.addEventListener("keyup", (event) => {
    if (event.key === 'q') {flutabs.grid.add_octave();}
    else if (event.key === 'd') {flutabs.grid.add_columns();}
    else if (event.key === 'a') {flutabs.grid.remove_columns();}
    else if (event.key === 'Escape') {flutabs.reset_page();}
    else if (event.key === 'w') {flutabs.transpose_by_value(1);}
    else if (event.key === 's') {flutabs.transpose_by_value(-1);}
    else if (event.key === 'z') {flutabs.get_melody_text();}
    else if (event.key === 'x') {flutabs.melody_to_link();}
    else if (event.key === 'c') {flutabs.melody_text_to_grid();}
    else if (event.key === 'e') {flutabs.strip_melody();}
});
