const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs-extra');
const { join } = require('path');
const _ = require('lodash');
const { spawnSync, spawn } = require('child_process');
const debug = require('debug');

const log = debug('@pie-ui:scripts:babel-multiple');

class Processes {
  constructor(arr) {
    this.processes = arr || [];
    this.init();
  }

  init() {
    this.processes.forEach(p => {
      p.process.on('error', e => {
        log('error: ', p.src, e);
      });
      p.process.on('data', () => {
        log('data: ', p.src, arguments);
      });
    });
  }

  exit() {
    this.processes.forEach(p => {
      log('killing: ', p.src);
      p.process.kill();
    });
  }
}

exports.watch = (targets, opts = {}) => {
  const babel = opts.babel || './node_modules/.bin/babel';

  if (!Array.isArray(targets)) {
    throw new Error('Targets must be an array');
  }

  const processes = targets.map(t => {
    const args = [
      t.src,
      '--watch',
      '--out-dir',
      t.target,
      '--ignore',
      'node_modules',
      '--sourcemaps',
      'inline'
    ];
    log('start: ', t.src, t.target);

    return {
      src: t.src,
      target: t.target,
      process: spawn(babel, args, { stdio: 'inherit' })
    };
  });

  return new Processes(processes);
};
