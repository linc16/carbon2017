// DEPENDENCIES AND SETUP
// ===============================================

var express = require('express'),
    app = express(),
    port = Number(process.env.PORT || 8080);

var  bodyParser = require('body-parser'); // Middleware to read POST data

// Set up body-parser.
// To parse JSON:
    app.use(bodyParser.json());
// To parse form data:
app.use(bodyParser.urlencoded({
    extended: true
}));

// DATABASE
// ===============================================

// Setup the database.
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'accounts.db', // provide a path to the database file
    autoload: true, // automatically load the database
    timestampData: true // automatically add and manage the fields createdAt and updatedAt
});

// Define a goal
var account = {
    description: 'Balance is blahblah',
};

// Save this account to the database
db.insert(account, function(err, newAccount) {
    if (err) console.log(err);
    console.log(newAccount);
});

// ROUTES
// ===============================================

// Define the home page route
app.get('/', function(req, res) {
    res.send('Hello world!');
});

// GET all accounts
// (Accessed at GET http://localhost:8080/accounts)
app.get('/accounts', function(req, res) {
    db.find({}).sort({
        updatedAt: -1
    }).exec(function(err, accounts) {
        if (err) res.send(err);
        res.json(accounts);
    });
});

// POST a new account
// (Accessed at POST http://localhost:8080/accounts)
app.post('/accounts', function(req, res) {
    var account = {
        description: req.body.description,
    };
    db.insert(account, function(err, account) {
        if (err) res.send(err);
        res.json(account);
    });
});

// GET an account using ID
// (Accessed at GET http://localhost:8080/account/account_id)
app.get('/accounts/:id', function(req, res) {
    var account_id = req.params.id;
    db.findOne({
        _id: account_id
    }, {}, function(err, account) {
        if (err) res.send(err);
        res.json(account);
    });
});

// DELETE an account
// (Accessed at DELETE http://localhost:8080/account/account_id)
app.delete('/accounts/:id', function(req, res) {
    var account_id = req.params.id;
    db.remove({
        _id: account_id
    }, {}, function(err, account) {
        if (err) res.send(err);
        res.sendStatus(200);
    });
});


// START THE SERVER
// ===============================================

app.listen(port, function() {
    console.log('Listening on port ' + port);
});