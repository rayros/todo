'use strict';
Polymer('todo-categories', {
  ready: function() {
    var _ = this;
    _.$.add.onclick = function() {
      _.fire('new-category');
    };
  },
  update: function() {
    var _ = this;
    
    todoDatabase
    .
    current('category', function(categoryObject) {
      todoDatabase.categories(function(array) {
        var items = _.$.items;
        while (items.firstChild) {
          items.removeChild(items.firstChild);
        }
        array.forEach(function(object, index) {
          var el = document.createElement('core-item');
          el.label = object.name;
          el.onclick = function() {
            _.fire('select-category', object);
          };
          _.$.items.appendChild(el);
          if (categoryObject.id === object.id) {
            _.$.items.selected = index;
          }
        });
      });
    });
  }
});
