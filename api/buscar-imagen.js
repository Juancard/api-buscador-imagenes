var Search = require('bing.search');
var util = require('util');
var url = require('url');
var busqueda;

module.exports = function(key,urlQuery){
	var limiteResultados = 50;
	busqueda = new Search(key,limiteResultados);
	var jsonQuery = parsearUrlQuery(urlQuery);
	console.log(jsonQuery.cadena,jsonQuery.offset);
	
	/*
	buscarWeb(cadenaBusqueda,{top:10}, function(err, results) {
	    if (err) throw err;
	    	console.log("entre");
		  console.log(util.inspect(results, {colors: true, depth: null}));
	});
	*/
}

function buscarWeb(query,options,callback){
	busqueda.web(query,options,callback);
}

function parsearUrlQuery(urlQuery){
	var propiedad = "offset";
	var objetoUrlQuery = url.parse(urlQuery);
	var cadenaBusqueda = objetoUrlQuery.pathname.split("%20").join(" ");
 	var query = objetoUrlQuery.query;
 	var offset = (esQueryValida(query))? getValorQuery(query) : 0; 
 	
 	return makeJson(cadenaBusqueda,offset);

 	function esQueryValida(query){
 		return (query.indexOf(propiedad+"=") == 0) && (getValorQuery(query) >= 0);
 	}

 	function getValorQuery(query){
 		return query.slice(propiedad.length+1);
 	}

 	function makeJson(cadena,offset){
		return	{
			"cadena" : cadenaBusqueda,
			"offset" : offset
		};
 	}
}