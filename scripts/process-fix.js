module.exports = (log, onSigInt) => {
  process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    log(error.message);
  });

  if (process.platform === 'win32') {
    var rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('SIGINT', () => process.emit('SIGINT'));
  }

  process.on('SIGINT', onSigInt);

  process.on('exit', () => {
    log('done.');
  });
};
