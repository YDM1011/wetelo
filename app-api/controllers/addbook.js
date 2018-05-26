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
    const book = req.body;
    if(book && book.token) {
        User.findOne({token: book.token})
            .exec((err, contentUser) => {
                if (!contentUser) {
                    send(res, 404, {
                        "message": "token not found"
                    });
                    return;
                } else if (err) {
                    send(res, 404, err);
                    return;
                }
                /* create book for user with token wich was find */
                Book.create({
                    src: book.src,
                    name: book.name,
                    title: book.title,
                    des: book.des,
                    status: book.status,
                    userId: contentUser._id
                }, (err, content) => {
                    if(err) {
                        send(res, 400, err);
                    } else {
                        send(res, 201, content);
                    }
                });
                /* end */
            });
    }
    else {
        send(res, 404, {
            "message": "No token in request"
        });
    }

};