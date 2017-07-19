var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bodyParser = require('body-parser');

var activity = require('./models/status')

var db = mongoose.connect('mongodb://localhost:27017/statTracker', { useMongoClient: true });

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/activity', function(req, res) {
    console.log('I received a GET request')
    activity.find({}, null, { sort: { date: -1 } }, function(err, docs) {
        // console.log(docs);
        res.json(docs);
    });
});

app.post('/activity', function(req, res) {
    console.log(req.body);
    activity.create({
        name: req.body.name,
        stat: req.body.stat,
        date: req.body.date
    }, function(error, stats) {
        if (error) {
            res.render('error', {
                title: 'error',
                error: 'activity was not created'
            });
        } else {
            res.json(stats);
        }
    });
});

app.delete('/activity/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    activity.findByIdAndRemove({ _id: id }, function(err, deleted) {
        if (err) {
            console.log('activity was not deleted!');
        } else {
            console.log('Successfully Deleted!');
            res.json(deleted);
        }
    });
});

app.get('/activity/:id', function(req, res) {
    var id = req.params.id;
    activity.findOne({ _id: id }, function(err, docs) {
        // console.log(docs);
        res.json(docs);
    });
});

app.put('/activity/:id', function(req, res) {
    var id = req.params.id;
    activity.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        stat: req.body.stat,
        date: req.body.date
    }, function(err, docs) {
        res.json(docs);
    });
});

app.listen(3000);
console.log("you are now rockin' with best!");