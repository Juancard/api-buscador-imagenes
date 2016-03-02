var Search = require('bing.search');
var util = require('util');
var busqueda;

module.exports = function(key){
	var limiteResultados = 100;
	busqueda = new Search(key/*,limiteResultados*/);
	buscarWeb("gato casa",{top:2}, function(err, results) {
	    //if (err) throw err;
	  console.log(util.inspect(results, 
      {colors: true, depth: null}));
	  });
}

function buscarWeb(query,options,callback){
	busqueda.web(query,options,callback);
}

