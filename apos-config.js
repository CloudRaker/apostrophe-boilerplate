'use strict';
const path = require('path');
const fs = require('fs');
const config = require('./config');


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

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project


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

    'apostrophe-rich-text-widgets': {
      sanitizeHtml: {
        allowedAttributes: {
          '*': ['style']
        }
      }
    },

    'apostrophe-attachments': {
      uploadfs: {
        https: true
      }
    },

    'apostrophe-db-mongo-3-driver': {},
    'apostrophe-express': {
      address: config['ADDRESS'],
      port: config['PORT']
    },
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') },
    'apostrophe-workflow': {},

    ...customModules
  }
};

module.exports = aposOptions;
