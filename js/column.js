function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = createColumn();

  function createColumn() {
    //  CREATE NEW NODES
    var column = $('<div>').addClass('column').attr('data-idnum', self.id);
    var columnTitle = $('<h2>').addClass('column-title').text(self.name);
    var columnCardList = $('<ul>').addClass('column-card-list');
    var columnEdit = $('<button>').addClass('btn-col-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');
    var columnDelete = $('<button>').addClass('btn-col-delete');
    var columnAddCard = $('<button>').addClass('add-card').text('Add new task');


    //  ADD EVENTS TO NODES
    columnDelete.click(function() {
      self.deleteColumn();
    });

    columnEdit.click(function() {
      self.editColumn();
    });

    columnAddCard.click(function() {
      var cardName = prompt('Enter card\'s name');
      event.preventDefault();
      if (cardName == null) {
        return null;
      } else {
        $.ajax({
          url: baseUrl + '/card',
          method: 'POST',
          data: {
            name: cardName,
            bootcamp_kanban_column_id: self.id
          },
          success: function(response) {
            var card = new Card(response.id, cardName);
            self.createCard(card);
          }
        });
      }
    });

    //  COLUMN ELEMENT GENERATOR
    column.append(columnTitle)
      .append(columnDelete)
      .append(columnEdit)
      .append(columnAddCard)
      .append(columnCardList);
    return column;
  }
}
Column.prototype = {
  createCard: function(card) {
    this.element.children('ul').append(card.element);
  },
  deleteColumn: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function(response) {
        self.element.remove();
      }
    });
  },
  editColumn: function() {
    var self = this;
    var newName = prompt('Edit your column:', self.name);
    if (newName === null) {
      return newName = 'name';
    } else {
      event.preventDefault();
      if (newName != self.name) {
        $.ajax({
          url: baseUrl + '/column/' + self.id,
          method: 'PUT',
          data: {
            name: newName,
          },
          success: function(response) {
            self.element.children('.column-title').text(newName);
            self.name = newName;
          }
        });
      }
    }
  }
};