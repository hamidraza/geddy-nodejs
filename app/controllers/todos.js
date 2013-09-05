var Todos = function () {
    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.index = function (req, resp, params) {
        var self = this;
        geddy.model.adapter.Todo.all(function(err, todos){
            self.respond({params: params, todos: todos});
        });
    };

    this.add = function (req, resp, params) {
        this.respond({params: params});
    };

    this.create = function (req, resp, params) {
        var self = this;
        var todo = geddy.model.Todo.create({
            title: params.title,
            status: 'open',
            id: geddy.string.uuid()
        });
        todo.save(function(err, data){
            if(err){
                params.errors = err;
                self.transfer('add');
            }else{
                geddy.model.adapter.Todo.save(todo, '', self.redirect({ controller: self.name }));
            }
        });
    };

    this.show = function (req, resp, params) {
        var self = this;
        geddy.model.adapter.Todo.load(params.id, function(err, todos){
            self.respond({params: params, todo: todos});
        });
    };

    this.edit = function (req, resp, params) {
        var self = this;
        geddy.model.adapter.Todo.load(params.id, function(err, todos){
            self.respond({params: params, todo: todos});
        });
    };

    this.update = function (req, resp, params) {
        var self = this;
        geddy.model.adapter.Todo.load(params.id, function (err, todo) {
            todo.status = params.status;
            todo.title = params.title;
            todo.save(function (err, data) {
                if (err) {
                    params.errors = err;
                    self.transfer('edit');
                } else {
                    geddy.model.adapter.Todo.save(todo, '', self.redirect({ controller: self.name }));
                }
            });
        });
    };

    this.remove = function (req, resp, params) {
        var self = this;
        geddy.model.adapter.Todo.remove(params.id, function(err){
            if (err) {
                params.errors = err;
                self.transfer('edit');
            } else {
                self.redirect({controller: self.name});
            }
        });
    };

};

exports.Todos = Todos;

