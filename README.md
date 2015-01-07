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

### repeat a group of questions


