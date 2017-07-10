const leftDirections = ['north', 'west', 'south', 'east', 'north'];
const rightDirections = ['north', 'east', 'south', 'west', 'north'];
module.exports = {
  turnLeft: state => {
    let i = leftDirections.indexOf(state.direction);
    const direction = leftDirections[i + 1];
    return Object.assign({}, state, { direction });
  },
  turnRight: state => {
    let i = rightDirections.indexOf(state.direction);
    const direction = leftDirections[i + 1];
    return Object.assign({}, state, { direction });
  },
};
