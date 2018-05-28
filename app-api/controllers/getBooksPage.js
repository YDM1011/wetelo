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
    const attr = req.body;
    const page = attr.brif;
    const token = attr.token;
    const sort = attr.sort;
    const vector = attr.vector;
    var qs = false;
    try{
        qs = attr.search.toLowerCase();
    }catch(err){}
    User
        .findOne({token: token})
        .exec((err, user) => {
            if(err || !user){
                send(res, 404, {"message": "token invalid"});
                return
            }
            var query = {};
            if(qs){
                query   = {$and: [{userId: user._id}, {$or: [{title: qs},{name: qs}]} ]};
            }else{
                query   = {userId: user._id};
            }

            var s = {};
            s[sort] = vector;
            const options = {
                sort: s,
                populate: 'book',
                lean:     true,
                page:   page,
                limit:    3
            };
            Book.paginate(query, options).then(function(result) {
                send(res, 200, result)
            });
        });

};