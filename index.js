var promptFlow = require('./lib/prompt-wrapper');

var prompts1 = [
  {
    type: "input",
    name: "first_name",
    message: "What's your first name"
  },{
    type: "input",
    name: "last_name",
    message: "What's your last name"
  },{
    type: "input",
    name: "age[]",
    message: "How old were you"
  }
];

var prompts2 = [
  {
    type: "input",
    name: "first_name",
    message: "What's your first name"
  },{
    type: "input",
    name: "age[]",
    message: "Realy, How old were you"
  }
];

var prompts3 = [
  {
    type: "input",
    name: "tvShow",
    message: "What's your favorite TV show?"
  },
  {
    type: "confirm",
    name: "askAgain",
    message: "Want to enter another TV show favorite (just hit enter for YES)?",
    default: true
  }
];

promptFlow.prompt(prompts1)
.next(function(ans){
  return prompts2
})
.done(function(ans){
  console.log(ans);
  promptFlow.prompt(prompts1)
.next(function(ans){
  return prompts2
})
.done(function(ans){
  console.log(ans);
});
});