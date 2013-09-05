var Todo = new (function () {

    this.save = function(todo, opts, callback){
        if (typeof callback != 'function') {
            callback = function(){};
        }

        cleanTodo = {
            id: todo.id, 
            saved: todo.saved,
            title: todo.title,
            status: todo.status
        };
        
        todo = geddy.model.Todo.create(cleanTodo);
        if (!todo.isValid()) {
            return callback(todo.errors, null);
        }

        geddy.db.todos.findOne({id: todo.id}, function(err, doc){
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                geddy.db.todos.update({id: todo.id}, cleanTodo, function(err, docs){
                    return callback(todo.errors, todo);
                });
            } else {
                todo.saved = true;
                geddy.db.todos.save(todo, function(err, docs){
                    return callback(err, docs);
                });
            }
        });

    };

    this.all = function(callback){
        if (typeof callback != 'function') {
            callback = function(){};
        }
        todos = [];
        //return callback(null, todos);

        geddy.db.todos.find().toArray(function(err, docs){
            if (err) {
                return callback(err, null);
            }
            for (var i in docs) {
                todos.push( geddy.model.Todo.create(docs[i]) );
            }
            return callback(null, todos);
        });

    };

    this.load = function(id, callback){
        if(typeof callback != 'function'){
            callback = function(){};
        }

        var todo;
        geddy.db.todos.findOne({id: id}, function(err, doc){
            if (err) {
                return callback(err, null);
            }
            if (doc) {
                todo = geddy.model.Todo.create(doc);
            }
            return callback(null, todo);
        });
        
    };

    this.remove = function(id, callback){
        if(typeof callback != 'function'){
            callback = function(){};
        }
        geddy.db.todos.remove({id: id}, function(err, res){
            callback(err);
        });
        return callback({message: "To Do not found"});
    };

})();
exports.Todo = Todo;