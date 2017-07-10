module.exports = {
  direction: require('./direction'),
  speedUp: state => {
    return Object.assign({}, state, {
      speed: state.speed + 5
    });
  },
  speedDown: state => {
    return Object.assign({}, state, {
      speed: state.speed - 5
    });
  },
};
