const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const fs = require('fs');
const md5 = require('md5');
const User = mongoose.model('user');
const Book = mongoose.model('book');
const data = require('../../config/index');
const path = require('path');

function send(res, status, mes){
    res.status(status);
    res.json(mes);
}

module.exports = (req,res)=>{
    const page = req.params.brif;
    const token = req.params.token;
    const sort = req.params.sort;
    const vector = req.params.vector;
    User
        .findOne({token: token})
        .exec((err, user) => {
            if(err || !user){
                send(res, 404, {"message": "token invalid"});
                return
            }
            const query   = {userId: user._id};
            var s = {};
            s[sort] = vector
            const options = {
                sort: s,
                populate: 'book',
                lean:     true,
                page:   page,
                limit:    3
            };
console.log(options);
            Book.paginate(query, options).then(function(result) {
                send(res, 200, result)
            });
        });

};