const DEFAULT_GRID_COLUMNS_COUNT = 24;
const NOTES_LABELS = ['Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Si', 'Do'];
const GRAYED_NOTES = ['Do', 'Fa'];
const FLAT_NOTES_VALUES = [1, 3, 6, 8, 10];
const NATURAL_NOTE_SYMBOL = '⬤';
const FLAT_NOTE_SYMBOL = '◀';
const NOTE_SYMBOLS = ['⬤', '◀', '⬤', '◀', '⬤', '⬤', '◀', '⬤', '◀', '⬤', '◀', '⬤']

MMELODIES = [
    {
        'name': '',
        'description': '',
        'link': '',
    },
];

MELODIES = {
    'twinkle': '0, 0, 7, 7, 9, 9, 7, , 5, 5, 4, 4, 2, 2, 0, 7, 7, 5, 5, 4, 4, 2, , 7, 7, 5, 5, 4, 4, 2, ',
    'carry on': '4, 7, 7, 12, 11, 7, 7, 9, 7, 5, , 4, 7, 7, 12, 11, 7, 4, 2, , 4, 7, 7, 12, 11, 7, 7, 9, 7, 5, , 4, 2, 4, 2, 0, 0, ',
    'megalovania': '9, 9, 21, 16, , 15, 14, 12, , 9, 12, 14, ',
    'symphony40': '10, 9, 9, 10, 9, 9, 10, 9, 9, 17, , 17, 16, 14, , 14, 12, 10, , 10, 9, 7, 7, , 9, 7, 7, 9, 7, 7, 9, 7, 7, 16, , 16, 14, 13, , 13, 10, 9, , 9, 7, 5, 5, , 17, 16, 16, 19, 13, 16, 14, 9, , 17, 16, 16, 19, 13, 16, 14, 17, 16, 14, 12, 10, 9, 1, 2, 4, 5, , 7, 5, 4, 2, 9, , 8, 9, , 8, 9, , 8, 9, 20, 21, 20, 21, ',
    'guren': '13, 13, 16, 15, 11, 11, 13, 13, 16, 15, 11, , 20, 16, 18, 15, 16, 13, 15, 11, , 20, 16, 18, 15, 16, 15, 13, 11, , 23, 19, 21, 18, 21, 16, 18, 14, , 23, 19, 21, 18, 21, 18, 16, 15, ',
    'smoke': '7, 10, 12, , 7, 10, 13, 12, , 7, 10, 12, , 10, , 7, ',
    'ducktales': '5, 9, 12, 14, 15, 15, 14, 12, 10, , 10, 9, , 10, 9, , 5, 9, 12, 14, 15, 15, 14, 12, 10, , 15, 14, , 15, 14, , 7, 10, 14, 14, 12, , 14, 17, 19, 21, 19, 17, 14, 17, 17, 24, 21, , 17, 15, 13, 15, 17, 15, 13, 15, 17, 17, 24, 21, , 17, 15, 13, 15, 17, 15, 13, 15, 17, 17, 24, 21, ',
}