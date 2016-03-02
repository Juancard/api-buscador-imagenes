var http = require("http");
var fs = require("fs");
var api = require("./api/buscar-imagen");
var url = require("url");

require('dotenv').config();

var servidor = http.createServer(function(req,res){

  if (req.url == "/"){
    fs.readFile("./client/index.html",function(err,data){
      if (err) {enviar404(res);}
      res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
      res.end(data);
    })
  } else {
  	var objetoUrl = url.parse(req.url);
  	var urlParseada = req.url.match(/(^\/api)(\/[a-z]+)(.+)/);
  	if (urlParseada && urlParseada[1]=="/api"){
  		if (urlParseada[2]=="/imagesearch"){
  			console.log("Se busca",urlParseada[3]);
  		} else if (urlParseada[2]=="/latest"){
  			console.log("ultimos resultados");
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