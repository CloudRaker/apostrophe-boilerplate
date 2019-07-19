var modulesList = [];

function initAll() {

  // import all *.js files at same level
  // and `init()` them
  modulesList.forEach(function (m) {
    const loadedModule = require('./' + m + '.js');
    if (typeof loadedModule.init === 'function') {
      loadedModule.init();
    }
  });

}

$(initAll);
