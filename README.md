# API: Servicio de busqueda de imágenes

## Historias de usuario:

1) Puedo obtener la URL de la imagen, texto alternativo (alt) y url de la página web relativo a una cadena de caracteres dada.

2) Puedo elegir la página de respuesta agregando ?offset=[numero-pagina] como parametro a la URL.

3) Puedo obtener una lista de las busquedas realizadas más recientes.

## Ejemplo de busquedas:

```url
https://xxx.herokuapp.com/api/imagesearch/gato%20perro

https://xxx.herokuapp.com/api/imagesearch/gato%20perro?offset=10 
```

## Obtener historial:

```url
https://xxx.herokuapp.com/api/latest/imagesearch/
```