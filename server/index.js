// DEPENDENCIES AND SETUP
// ===============================================

var express = require('express'),
    app = express(),
    port = Number(process.env.PORT || 8080);

// DATABASE
// ===============================================

// Setup the database.
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'accounts.db', // provide a path to the database file
    autoload: true, // automatically load the database
    timestampData: true // automatically add and manage the fields createdAt and updatedAt
});

// Let us check that we can save to the database.
// Define a goal.
var account = {
    description: 'Balance is blahblah',
};

// Save this goal to the database.
db.insert(account, function(err, newAccount) {
    if (err) console.log(err);
    console.log(newAccount);
});

// ROUTES
// ===============================================

// Define the home page route.
app.get('/', function(req, res) {
    res.send('Hello world!');
});

// START THE SERVER
// ===============================================

app.listen(port, function() {
    console.log('Listening on port ' + port);
});