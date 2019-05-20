/*eslint-env node*/

var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var mysql = require('mysql');
var MongoClient = require('mongodb');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());


//https://www.freemysqlhosting.net/login/

app.get('/', (req, res) => {
    res.send('Welcome to Node API');
    console.log('Contattoooo');
})




/* LOGIN PER L'UTENTE */

app.post('/login', function(req, res) {

    console.log('LOGIN');
    var user = req.body.user;
    var pass = req.body.pass;
    var state = 'ko';

    var con = Connection();

    con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT cognome FROM Users WHERE username = "' + user + '" AND password = "' + pass + '"', function(err, result, fields) {
            if (err) throw err;
            if (result == '') {
                //console.log('niente ' + result)
                res.send(false);
            } else {
                console.log("LOGIN DI " + user + "!!");
                res.send(true)
            }
        });
    });
})



/* REGISTER PER L'UTENTE */

app.post('/register', function(req, res) {

    console.log('REGISTER');
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var user = req.body.user;
    var pass = req.body.pass;


    var con = Connection();

    con.connect(function(err) {
        if (err) throw err;
        con.query('INSERT INTO Users(nome, cognome, email, username, password) VALUES("' + name + '","' + surname + '","' + email + '","' + user + '","' + pass + '")', function(err, result, fields) {
            if (err) throw err;
            console.log("REGISTER DI " + user + "!!");
            res.send(true)
        });
    });
})



/* GET VEICOLI */

app.get('/getVeicoli', function(req, res) {

    console.log('GET|VEICOLI');

    MongoClient.connect('mongodb+srv://admin:admin@database-zsqmz.mongodb.net/test?retryWrites=true', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoElettrici");
        dbo.collection("veicoli").find({}).toArray(function(err, result) {
            if (err) {
                //console.log(JSON.stringify(result))
                throw err;
            }
            console.log(result)
            res.send(result);
            db.close();
        });

    });

})



function Connection() {

    var con = mysql.createConnection({
        host: 'sql2.freemysqlhosting.net',
        user: 'sql2291452',
        password: 'tY7%yQ6*',
        database: 'sql2291452'
    });

    return con;

}


app.listen(3000, () => console.log('Example app listening on port 3000!'))


