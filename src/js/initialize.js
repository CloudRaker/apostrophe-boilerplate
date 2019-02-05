var modulesList = [];

function initAll() {

  modulesList.forEach(function (m) {
    require('./' + m + '.js').init();
  });

}

$(initAll);
