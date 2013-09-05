var init = function(cb) {
    
    var mongo = require('mongodb-wrapper');
     
    geddy.db = mongo.db('localhost', 27017, 'todo');
    geddy.db.collection('todos');
    
    // Add uncaught-exception handler in prod-like environments
    if (geddy.config.environment != 'development') {
        process.addListener('uncaughtException', function (err) {
            var msg = err.message;
            if (err.stack) {
                msg += '\n' + err.stack;
            }
            if (!msg) {
                msg = JSON.stringify(err);
            }
            geddy.log.error(msg);
        });
    }

    geddy.todos = [];
    geddy.model.adapter = {};
    geddy.model.adapter.Todo = require(process.cwd() + '/lib/model_adapters/todo').Todo;

    cb();
};

exports.init = init;