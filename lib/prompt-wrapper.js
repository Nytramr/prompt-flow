var inquirer = require('inquirer');
var CO = require('./object-change');
var changeObj = CO.changeKeysAndValues;
var updateObject = CO.updateObject;

var _ctx = undefined;

function Prompt () {};

var prompt = function (answers) {
  answers = answers || {};
  return function(){
    var that = {};
    var _question = arguments[0];
    var _cbs = [];
    var index = 0;

    function _handlePrompt (current_answers) {
      changeObj(current_answers);
      updateObject(answers, current_answers);
      var cb = _cbs[index++];
      if (index < _cbs.length) {
        if (typeof cb === 'function') { //If the cb is a function
          var newQuest = cb(answers); //Resolve the function
          inquirer.prompt(newQuest, _handlePrompt);
        } else {
          inquirer.prompt(cb, _handlePrompt);
        }
      } else {
        cb(answers);
      }
    };
    
    that.next = function (cb) {
      _cbs.push(cb);
      
      return that;
    };

    that.done = function (cb) {
      _cbs.push(cb);
    };

    if (_question) {
      //Question is an object
      inquirer.prompt(_question, _handlePrompt);

    }else{
      throw new Error('A question must be provided');
    }
    
    return that;
  };
};

module.exports.context = function (ctx) {
  
};

module.exports.prompt = prompt({});
//module.exports.prompt.prototype = new Prompt();
