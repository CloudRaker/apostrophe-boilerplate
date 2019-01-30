var modulesList = [];

function initAll() {

  modulesList.forEach(function (m) {
    require('./' + m + '.js').init();
  });

}

$(document).ready(initAll);
document.addEventListener('swup:contentReplaced', initAll);
