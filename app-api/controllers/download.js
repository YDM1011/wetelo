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
    const src = req.params.id;
    if(src) {
        var file = `./app-client/${src.split('.pdf')[0]}.pdf`;
        console.log(`${src.split('.pdf')[0]}.pdf`);
        console.log(file);
        res.download(file);
    } else {
        send(res, 404, {
            "message": "No book"
        });
    }
};