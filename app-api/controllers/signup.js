const mongoose = require('mongoose');
const fs = require('fs');
const md5 = require('md5');
const User = mongoose.model('user');
const Book = mongoose.model('book');
const data = require('../../config/index');
const path = require('path');

function send(res, status, mes){
    res.status(status);
    res.json(mes);
};

module.exports = (req,res)=>{
    const signup = req.body;
    console.log(signup);
    if(signup && signup.email && signup.password) {
        User.findOne({email: signup.email})
            .exec(function (err, contentUser) {
                if (contentUser) {
                    send(res, 404, {
                        "message": "email in use"
                    });
                    return
                } else if (err) {
                    send(res, 404, err);
                    return
                } else if (!contentUser){
                    /* create user if email was not find */
                    User.create({
                        email: signup.email.replace(/<\/?[^>]+>/g,''),
                        password: md5(signup.password.replace(/<\/?[^>]+>/g,'')),
                        token: md5(signup.email.replace(/<\/?[^>]+>/g,'')),
                        veryfi: true
                    }, (err, content) => {
                        if(err) {
                            send(res, 400, err);
                        } else {
                            send(res, 201, {
                                email: content.email,
                                token: content.token,
                            });
                        }
                    });
                    /* end */
                }

            });
    }
    else {
        send(res, 404, {
            "message": "No email or password"
        });
    }

};