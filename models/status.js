var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var statSchema = new Schema({
    name: { type: String, required: true, },
    stat: { type: String, required: true, },
    date: { type: String, required: true, }
});

module.exports = mongoose.model("status", statSchema);