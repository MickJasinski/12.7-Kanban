var board = {
  name: 'Kanban Board',
  createColumn: function(column) {
    this.element.append(column.element);
    initSortable();
  },
  element: $('#board .column-container')
};

//  DRAG & DROP
function initSortable() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}
//  CREATE COLUMN
$('.create-column').click(function() {
  var columnName = prompt('Enter a column name');
  if (columnName == null) {
    return null;
  } else if (columnName.length > 10) {
    alert('This name is too long!');
  } else {
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response) {
        var column = new Column(response.id, columnName);
        board.createColumn(column);
      }
    });
  }
});