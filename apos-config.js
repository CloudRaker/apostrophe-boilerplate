'use strict';
const path = require('path');
const fs = require('fs');

// Config should be loaded before anything else happens.
// noinspection JSUnusedLocalSymbols
const config = require('./lib/config');


const customModuleNames = fs.readdirSync(path.resolve(__dirname, 'lib', 'modules'))
  .filter(dp => /^custom-/.test(dp));

const customPiecesNames = customModuleNames.filter(moduleName => !/-(pages|widgets)$/.test(moduleName));

const customModules = customModuleNames.reduce(
  (acc, dp) => {
    acc[dp] = {};
    return acc;
  },
  {}
);

const aposOptions = {
  root: module,

  shortName: 'apostrophe-boilerplate',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {
    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    'apostrophe-docs': {
      // present clear error message every time a slug is in conflict, forcing a manual choice
      deconflictSlugs: false
    },

    'apostrophe-admin-bar': {
      addGroups: [
        {
          label: 'Custom Content',
          items: customPiecesNames
        }
      ]
    },

    'apostrophe-attachments': {
      uploadfs: {
        https: true
      }
    },

    'apostrophe-db-mongo-3-driver': {},

    // Uncomment to enable workflow:
    // 'apostrophe-workflow': {},

    ...customModules
  }
};

module.exports = aposOptions;
