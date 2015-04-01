var Gpio = require('onoff').Gpio;
var led = {};

led['red'] = new Gpio(17, 'out')
led['yellow'] = new Gpio(18, 'out');
led['green'] = new Gpio(27, 'out');

var currentColor = 'green';
var direction = down;
process.on('SIGINT', exit);

run();

function run() {
  direction();
  turnOn(currentColor);
  setTimeout(run, 200);
}


function down() {
  turnOff(currentColor);

  switch (currentColor) {
    case 'red':
      currentColor = 'yellow';
      break;
    case 'yellow':
      currentColor = 'green';
      break;
    case 'green':
      direction = up;
      break;
  }
}

  function up() {
    turnOff(currentColor);

    switch (currentColor) {
      case 'red':
        direction = down;
        break;
      case 'yellow':
        currentColor = 'red';
        break;
      case 'green':
        currentColor = 'yellow';
        break;
    }
}

function turnOn(color) {
  led[color].writeSync(1);
}

function turnOff(color) {
  led[color].writeSync(0);
}

function exit() {
  led['red'].unexport();
  led['yellow'].unexport();
  led['green'].unexport();
  process.exit();
}
