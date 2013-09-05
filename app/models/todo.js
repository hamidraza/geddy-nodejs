var Todo = function () {

  this.defineProperties({
    title: {
      type: 'String',
      required: true
    },
    id: {
      type: 'String',
      required: true
    },
    status: {
      type: 'String',
      required: true
    }
  });

  this.validatesPresent('title');
  this.validatesLength('title', {min: 5});

  this.validatesWithFunction('status', function(status){
    return status == 'open' || status == 'done';
  });


};


exports.Todo = Todo;

