const DEFAULT_GRID_COLUMNS_COUNT = 24;
const NOTES_LABELS = ['Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Si', 'Do'];
const GRAYED_NOTES = ['Do', 'Fa'];
const FLAT_NOTES_VALUES = [1, 3, 6, 8, 10];
const NATURAL_NOTE_SYMBOL = '⬤';
const FLAT_NOTE_SYMBOL = '◀';
const NOTE_SYMBOLS = ['⬤', '◀', '⬤', '◀', '⬤', '⬤', '◀', '⬤', '◀', '⬤', '◀', '⬤']
const FLUTABS_GRID_ID = 'flutabs-grid';


MELODIES = [
    {
        'name': 'Deep Purple - Smoke on the Water',
        'description': 'Most popular simpliest melody ever.',
        'melody': '2,5,7,,2,5,8,7,,2,5,7,,5,,2,',
    },
    {
        'name': 'Twinkle Twinkle little star',
        'description': 'Simple, single octave.',
        'melody': '0,0,7,7,9,9,7,,5,5,4,4,2,2,0,7,7,5,5,4,4,2,,7,7,5,5,4,4,2,',
    },
    {
        'name': 'Kansas City - Carry on',
        'description': 'All single octave notes are natural.',
        'melody': '4,7,7,12,11,7,7,9,7,5,,4,7,7,12,11,7,4,2,,4,7,7,12,11,7,7,9,7,5,,4,2,4,2,0,0,',
    },
    {
        'name': 'Undertale theme - Megalovania',
        'description': 'Second octave is involved + single flat note.',
        'melody': '9,9,21,16,,15,14,12,,9,12,14,',
    },
    {
        'name': 'Mozart - Symphony No. 40',
        'description': '2 octaves, lotta flats.',
        'melody': '10,9,9,10,9,9,10,9,9,17,,17,16,14,,14,12,10,,10,9,7,7,,9,7,7,9,7,7,9,7,7,16,,16,14,13,,13,10,9,,9,7,5,5,,17,16,16,19,13,16,14,9,,17,16,16,19,13,16,14,17,16,14,12,10,9,1,2,4,5,,7,5,4,2,9,,8,9,,8,9,,8,9,20,21,20,21,',
    },
    {
        'name': 'Attack on Titan OP 1 - "Guren no Yumiya" intro',
        'description': '1 hard octave, perfect for transpose.',
        'melody': '13,13,16,15,11,11,13,13,16,15,11,,20,16,18,15,16,13,15,11,,20,16,18,15,16,15,13,11,,23,19,21,18,21,16,18,14,,23,19,21,18,21,18,16,15,',
    },
    {
        'name': 'Duck Tales theme',
        'description': '2 octaves, medium difficulty, dynamic.',
        'melody': '5,9,12,14,15,15,14,12,10,,10,9,,10,9,,5,9,12,14,15,15,14,12,10,,15,14,,15,14,,7,10,14,14,12,,14,17,19,21,19,17,14,17,17,24,21,,17,15,13,15,17,15,13,15,17,17,24,21,,17,15,13,15,17,15,13,15,17,17,24,21,',
    },
];