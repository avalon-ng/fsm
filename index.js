const makeFSM = require('./fsm');

const actions = require('./actions');

const speedStatus = ({speed}) => (speed >= 10 ? 'run' : 'walk');

const stateMap = {
  start: {
    status: 'stand',
    state: {
      speed: 0,
      direction: 'north',
    },
  },
  states: {
    stand: {
      'direction.turnLeft': 'stand',
      'direction.turnRight': 'stand',
      speedUp: speedStatus,
      nop: 'stand',
    },
    walk: {
      'direction.turnLeft': 'walk',
      'direction.turnRight': 'walk',
      speedUp: speedStatus,
      nop: 'walk',
    },
    run: {
      'direction.turnLeft': 'run',
      'direction.turnRight': 'run',
      speedUp: 'run',
      speedDown: speedStatus,
    }
  }
}

const FSM = makeFSM(stateMap, actions);

FSM.doAction = (function(doAction) {
  return (action, ...args) => {
    console.log(`====== doing ${action} ======`);
    doAction.apply(FSM, [action].concat(args));
    console.log(FSM.getStatus());
    console.log(FSM.getState());
    console.log();
  }
})(FSM.doAction);

function randomPick(arr) {
  const len = arr.length;
  return arr[Math.floor(Math.random() * len)];
}

for(let i = 0; i < 10; i++) {
  let availableActions = FSM.getActions();
  const action = randomPick(availableActions);
  FSM.doAction(action);
}
