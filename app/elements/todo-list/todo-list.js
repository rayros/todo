'use strict';
Polymer('todo-list', {
  newCategory: function() {
    this.$.drawer.closeDrawer();
    this.$.newCategory.open();
  },
  selectCategory: function(event) {
    todoDatabase.setCurrent('category', event.detail);
    this.updateTasks();
    this.$.drawer.closeDrawer();
  },
  removeCategory: function() {
    
  },
  updateCategories: function() {
    this.$.categories.update();
    this.updateTasks();
  },
  updateTasks: function() {
    var _ = this, 
    items = _.$.items;
    while (items.firstChild) {
      items.removeChild(items.firstChild);
    }
    items = _.$.itemsChecked;
    while (items.firstChild) {
      items.removeChild(items.firstChild);
    }
    todoDatabase.current('category', function(categoryObject) {
      _.categoryName = categoryObject.name;
      todoDatabase.tasks(categoryObject, 0, function(array) {
        array.forEach(function(object) {
          var el = document.createElement('todo-item');
          el.taskId = object.id;
          el.checked = object.checked;
          var name = document.createElement('name');
          name.innerHTML = object.name;
          el.appendChild(name);
          _.$.items.appendChild(el);
        });
      });
      
      todoDatabase.tasks(categoryObject, 1, function(array) {
        _.$.done.hidden = array.length ? false : true;
        array.forEach(function(object) {
          var el = document.createElement('todo-item');
          el.taskId = object.id;
          el.checked = object.checked;
          var name = document.createElement('name');
          name.innerHTML = object.name;
          el.appendChild(name);
          _.$.itemsChecked.appendChild(el);
        });
      });
    });
  },
  ready: function() {
    var _ = this;
    todoDatabase.init(function() {
      _.updateCategories();
    });
    _.$.edit.onclick = function() {
      todoDatabase.current('category', function(categoryObject) {
        _.$.newCategory.open(categoryObject);
      });
    };
  },
  addTask: function() {
    this.$.newTask.open();
  },
  editTask: function(e) {
    this.$.newTask.open(e.detail);
  },
  resetDB: function() {
    todoDatabase.deleteDB();
    location.reload();
  }
});
