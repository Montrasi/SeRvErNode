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


app.post('/login', function(req, res) {

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
                res.send(state);
            } else {
                console.log("WOOOOW FUNZICA LA LOGIN!! L'UTENTE " + user + " HA ESEGUITO L'ACCESSO!!");
                console.log('cose ' + result)
                state= 'ok'
                res.send(state)
            }
        });
    });
})


app.post('/register', function(req, res) {

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
            console.log("WOOOOW FUNZICA IL REGISTER!!  L'UTENTE " + user + " HA ESEGUITO LA REGISTRAZIONE!!");
            res.send(true)
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


