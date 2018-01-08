// GENERIC FUNCTION
function randomString() {
  var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
  var str = '',
    i;
  for (i = 0; i < 10; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2639',
  'X-Auth-Token': 'd51d4af6c79ca9c606ab81e28e0ddc87'
};

$.ajaxSetup({
  headers: myHeaders
});

// CREATING NEW COLUMNS
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// ADDING NEW COLUMNS TO THE BOARD
board.createColumn(todoColumn);
board.createColumn(doingColumn);
board.createColumn(doneColumn);

// CREATING NEW CARDS
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// ADDING CARDS TO THE COLUMNS
todoColumn.createCard(card1);
doingColumn.createCard(card2);