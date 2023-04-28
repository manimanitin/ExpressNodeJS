var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Una API básica desde Express');
});


app.get('/saludo', function (req, res) {
    res.send('Hola desde la API');
});

app.get('/despedida', function (req, res) {
    res.send('Adios desde la API');
});


app.listen(3000, function () {
    console.log('Aplicacion ejemplo, escuchando el puerto 3000!');
});