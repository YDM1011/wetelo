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
    const bookEdit = req.body;
    if(bookEdit && bookEdit.id) {
        Book.findById(bookEdit.id)
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
                /* edit book with token wich was find */
                if (book) {
                    book.src = bookEdit.src;
                    book.name = bookEdit.name.toLowerCase();
                    book.title = bookEdit.title.toLowerCase();
                    book.des = bookEdit.des;
                    book.status = bookEdit.status;

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
