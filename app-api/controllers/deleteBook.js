const mongoose = require('mongoose');
const fs = require('fs');
const User = mongoose.model('user');
const Book = mongoose.model('book');
const data = require('../../config/index');
const path = require('path');

function send(res, status, mes){
    res.status(status);
    res.json(mes);
};

module.exports = (req,res)=>{
    const bookId = req.params.id;
    if(bookId) {
        Book
            .findByIdAndRemove(bookId)
            .exec(function(err, book) {
                if(err) {
                    send(res, 404, err);
                    return;
                }
                send(res, 204, null);
            })
    } else {
        send(res, 404, {
            "message": "No book"
        });
    }
};