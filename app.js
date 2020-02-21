const express = require('express');
const app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recode'
});

app.get('/front-end', function(req, res) {
    connection.query("SELECT * FROM conteudo WHERE modulo = 'front-end'", function(error, result) {
        res.render('./front-end', { dados: result });
    });
});

app.post('/front-end/Salva', function(req, res) {
    var dados = req.body;

    connection.query('INSERT INTO conteudo SET ?', dados, function(error, result) {
        res.redirect('/front-end');
    });
});

app.get('/front-end/Deletar/(:id)', function(req, res) {
    let id = req.params.id;
    connection.query("DELETE FROM conteudo WHERE id = " + id, function(error, result) {
        res.redirect('/front-end');
    });
});

app.get('/editar/(:id)', function(req, res) {
    connection.query('SELECT * FROM conteudo WHERE id = ' + req.params.id, function(err, linha) {

        res.render('editar', {
            id: linha[0].id,
            nome: linha[0].nome,
            modulo: linha[0].modulo
        })
    })
});

app.post("/atualizar/:id", function(req, res) {
    var dados = req.body;

    connection.query('UPDATE conteudo SET ? WHERE id = ' + req.params.id, dados, function(error, result) {
        res.redirect('/front-end')
    })
})


app.listen(3001, function() {
    console.log("Servidor rodando com Express");
});