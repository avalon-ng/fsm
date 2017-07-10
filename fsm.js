function makeFSM(stateMap, actions) {
  let status = stateMap.start.status;
  let state = stateMap.start.state;

  function transition(state, action) {
    let nextStatus = '';
    if(typeof action == 'function') {
      nextStatus = action(state);
    } else if(typeof action == 'string') {
      nextStatus = action;
    }
    if(!stateMap.states[nextStatus]) {
      const msg = `cannot transist to status ${nextStatus} from ${status}`;
      console.warn(msg);
      nextStatus = status;
    }
    return nextStatus;
  }

  function getAction(actions, actionName) {
    const actionParts = actionName.split('.');
    if(actionParts.length == 1) {
      return actions[actionName];
    }
    return getAction(actions[actionParts[0]], actionParts.slice(1).join('.'));
  }

  function doAction(actionName, payload) {
    const availableActions = stateMap.states[status];
    if(!availableActions[actionName]) {
      const msg = `action ${actionName} is not available for status ${status}`;
      throw new Error(msg);
    }
    const action = getAction(actions, actionName);
    // alow action to be no operation
    const nextState = action(state, payload) || state;
    state = nextState;
    status = transition(state, availableActions[actionName]);
  }

  return {
    getStatus: () => status,
    getState: () => state,
    getActions: () => Object.keys(stateMap.states[status]),
    doAction,
  };
}
module.exports = makeFSM;
