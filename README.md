# Hello

Simple FSM implementation.

# Usage

Define state machine like this

```js
const actions = {
  plus1: n => (n + 1),
};

const stateMap = {
  // define initial status and state
  // state can be object or anything..
  start: {
    status: 'init',
    state: 0,
  },
  states: {
    // states keys are status name
    init: {
      // action names, value can be string or function
      // if == string => string is next status
      // if == function => function() is next status
      plus1: 'plused'
    },
    plused: {
      plus1: (v) => {
        if(v >= 10) return 'dead';
        return 'plused';
      },
    },
    dead: { },
  }
}
```

Create a new FSM instance

```js
const FSM = makeFSM(stateMap, actions);

```

# FSM instance methods

## getStatus

Get current FSM status.

## getState

Get current FSM state.

## getActions

Get available actions for current status.

## doAction(actionName, [payload])

Do action.
