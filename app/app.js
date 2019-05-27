/*eslint-env node*/

var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var mysql = require('mysql');

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


function Connection() {

    var con = mysql.createConnection({
        host: 'remotemysql.com',
        user: 'B5b6RK1eDK',
        password: 'pXaUPBcrYJ',
        database: 'B5b6RK1eDK'
    });

    return con;

}


app.listen(4000, () => console.log('Example app listening on port 4000!'))

