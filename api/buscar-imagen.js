var Search = require('bing.search');
var url = require('url');
var busqueda;

module.exports = function(key,urlQuery){
	var limiteResultados = 10;
	busqueda = new Search(key,limiteResultados);
	var jsonQuery = parsearUrlQuery(urlQuery);
	console.log(jsonQuery.cadena,jsonQuery.offset);
	
	
	buscarImagenes(jsonQuery.cadena,jsonQuery.offset, function(err, results) {
	    if (err) throw err;
	    console.log("Tamaño resultado",results.length);
	    console.log(results);
	});

}

function buscarImagenes(cadena,offset,callback){
	var resultadosPorPágina = 10;
	var options = {
		top : resultadosPorPágina,
		skip : resultadosPorPágina * offset
	}
	busqueda.images(cadena,options,callback);
}

function parsearUrlQuery(urlQuery){
	var propiedad = "offset";
	var objetoUrlQuery = url.parse(urlQuery);
	var cadenaBusqueda = objetoUrlQuery.pathname.split("%20").join(" ");
 	var query = objetoUrlQuery.query;
 	var offset = (esQueryValida(query))? getValorQuery(query) : 0; 
 	
 	return makeJson(cadenaBusqueda,offset);

 	function esQueryValida(query){
 		return (query) && (query.indexOf(propiedad+"=") == 0) && (getValorQuery(query) >= 0);
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