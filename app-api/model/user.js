const mongoose = require('mongoose');
var user = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: false},
    veryfi: {type: Boolean, required: true},
    createdOn: {type: Date, "default": Date.now}
});

mongoose.model('user', user);