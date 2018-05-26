const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const book = new mongoose.Schema({
    src: {type: String, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    des: {type: String, required: true},
    status: {type: String, required: false},
    rating: {type: String, "default": 0},
    userId: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now}
});
book.plugin(mongoosePaginate);
mongoose.model('book', book);