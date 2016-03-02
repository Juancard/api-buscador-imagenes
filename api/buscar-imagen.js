var Search = require('bing.search');
var util = require('util');

search = new Search('account_key_123');

search.web('Tutta Bella Neapolitan Pizzeria',
  {top: 5},
  function(err, results) {
    console.log(util.inspect(results, 
      {colors: true, depth: null}));
  }
);