var http = require("http");
var fs = require("fs");
var api = require("./api/imagesearch.js");

require('dotenv').config();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection;
var busquedaSchema = mongoose.Schema({
	cadena: String,
	timestamp: String
});
var BusquedaModelo = mongoose.model('busqueda', busquedaSchema);

var servidor = http.createServer(function(req,res){
	if (req.url == "/"){
		fs.readFile("./client/index.html",function(err,data){
		  if (err) {enviar404(res);}
		  res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
		  res.end(data);
		})
	} else {
		var urlParseada = req.url.match(/(^\/api)(\/[a-z]+)(\/.+)/);
		if (urlParseada && urlParseada[1]=="/api"){
			if (urlParseada[2]=="/imagesearch" && urlParseada[3]){
				api(res,busquedaModelo,process.env.BING_KEY,urlParseada[3].slice(1));
			} else if (urlParseada[2]=="/latest" && urlParseada[3] == "/imagesearch"){
				console.log("en historial");
				mostrarHistorial(res,BusquedaModelo);
			} else{
				enviar404(res);
			}
		} else{
			enviar404(res);
		}
	}
});
servidor.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = servidor.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
  });

function enviar404(resp) {
  resp.writeHead(404, {'Content-Type': 'text/plain'});
  resp.write('Error 404: resource not found.');
  resp.end();
}
function mostrarHistorial(response, BusquedaModelo){
	var limiteValores = 10;

	BusquedaModelo.find({},function(err,results){
		if (err) throw err;
		response.writeHead(200, {"content-type": "application/json; charset=UTF-8"});
		var ultimosValores = getUltimosValores(results,limiteValores);
		response.end(JSON.stringify(ultimosValores));
	});

	function getUltimosValores(arreglo,n){
		var tamano = arreglo.length;
		var ultimo = tamano-1;
		var limiteInferior = (tamano<n)? 0 : tamano-n; 
		var respuesta = []
		for (var i=ultimo; i>=limiteInferior; i--){
			respuesta.push(armarJson(arreglo[i]));
		}
		return respuesta;
	}

	function armarJson(valor){
		return {
			termino: valor.cadena,
			cuando: valor.timestamp
		}
	}
}