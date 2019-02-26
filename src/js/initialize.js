var modulesList = [];

function initAll() {

  // import all *.js files at same level
  // and `init()` them
  modulesList.forEach(function (m) {
    require('./' + m + '.js').init();
  });

}

$(initAll);
