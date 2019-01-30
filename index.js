const _ = require('lodash');
const apostrophe = require('apostrophe');
const aposConfig = require('./apos-config');

const initializeApos = (config, cb) => {
  aposConfig.afterListen = cb;

  // Raw argv -- since we are running with Brunch, avoid passing them as-is.
  // Otherwise, it thinks we want to run a task.
  const argv = require('yargs').argv;

  aposConfig.argv = _.assign(argv, { _: [] });

  const aposRoot = apostrophe(aposConfig);

  initializeApos.aposRoot = aposRoot;

  return aposRoot.app;
};

module.exports = initializeApos;
