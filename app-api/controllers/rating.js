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
    const rating = req.body;
    if(rating && rating.id) {
        Book.findById(rating.id)
            .exec((err, book) => {
                if (!book) {
                    send(res, 404, {
                        "message": "Book not found"
                    });
                    return;
                } else if (err) {
                    send(res, 404, err);
                    return;
                }
                /* edit status with token wich was find */
                if (book) {
                    book.rating = rating.rtng
                    book.save(function(err) {
                        if(err) {
                            send(res, 404, err);
                        } else {
                            send(res, 200, book.name);
                        }
                    });
                }
                /* end */
            });
    }
    else {
        send(res, 404, {
            "message": "No token in request"
        });
    }

};
