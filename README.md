# Prompt Flow

## Installation

```sh
node install prompt-flow
```

## Usage

### Call a prompt and wait for its answers

```javascript
prompt({ /* question... */ }).done(function (answers) {
  //Do your thing with the answers
});
```

### Chaining prompts

Do you need to ask questions depending on previous answers? Then you can chain prompts using `next` method. Your answers will be accumulated all together in the same `answers` object.

```javascript
prompt({ /* questions... */ }).next(function (answers) {
  if (answers.someValue === 'somthing') {
    return { /* more questions... */ };
  } else {
    return { /* other questions... */ };
  }
}).next({ /* even more questions... */ }).done(function (answers) {
  //Do your thing with the answers
});
```

### Skip a step

Some times you need to skip a group of questions depending on other answers and continue with the flow. If that is the case you can just return a `falsy`value and that step will be forgotten.

```javascript
prompt({ /* questions... */ }).next(function (answers) {
  if (answers.someValue === 'somthing') {
    return { /* more questions... */ };
  }
  return false; //Or undefined, null, "", etc.
}).next({ /* even more questions... */ }).done(function (answers) {
  //Do your thing with the answers
});
```

### Repeat a group of questions

The main improvement of this feature is that you can acumulate automatically multiple answers in the same key, you just need to end the name of your prompt with `"[]"`.

#### Repeat once

Maybe you need to ask a group of questions twice, in that case the better choice is to generate the group of cuestions in an external array, then call `prompts` (or `next` if it is in the midle of the flow) with those questions and call a `next` method using those questions again. For example:

```javascript
var myQuestionnaire = [{ /* group of questions... */ }];

prompt(myQuestionnaire).next(function (answers) {
  if (answers.someValue === 'somthing') {
    return myQuestionnaire;
  }
  return false; //Or undefined, null, "", etc.
}).done(function (answers) {
  //Do your thing with the answers
});
```
#### Repeat several times

Or maybe you need to ask a group of questions several times until someting happens. The you shoud call `repeat` method.

```javascript
prompt({ /* questions... */ }).repeat(function (answers) {
  if (somethingHappens) {
    return false; //Or undefined, null, "", etc.
  }
  
  return { /* more questions... */ };
}).next({ /* even more questions... */ }).done(function (answers) {
  //Do your thing with the answers
});
```

### Confirm, List and Checkbox wrappers

Confirm, list and checboxes have their own wrappers in order to make easier altering the questionnarie's flow depending on the aswers given by the user.

#### Confirm

`confirm` method receives a single question (or a function that returns a single question) and exposes two methods: `yes`and `no` both of them accepts a function or another question.

If the user selects *yes* the `yes` method is executed and the `no` method is skipped, the opposite will occur if the user selects *no*.

> If you wont do something with the user's *yes*/*no* answer it is better to use a `next` method directly.

#### List and Checkbox



