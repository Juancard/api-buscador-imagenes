var Search = require('bing.search');
var util = require('util');

module.exports = function(key){
	search = new Search(key);
	console.log("en busqueda");
	buscarWeb(search);
}

function buscarWeb(search){
	search.web('Tutta Bella Neapolitan Pizzeria',
	  {top: 5},
	  function(err, results) {
	    console.log(util.inspect(results, 
	      {colors: true, depth: null}));
	  }
	);
}
