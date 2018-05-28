const mongoose = require('mongoose');
const md5 = require('md5');
const User = mongoose.model('user');
const data = require('../../config/index');

function send(res, status, mes){
    res.status(status);
    res.json(mes);
};

module.exports = (req,res)=>{
    const signin = req.body;
    if(signin && signin.email && signin.password) {
        const pass = md5(signin.password);
        User.findOne({email: signin.email, password: pass})
            .select('email token')
            .exec(function (err, userlog) {
                if (userlog) {
                    send(res, 200, {
                        email: userlog.email,
                        token: userlog.token
                    });
                    return
                } else if (err) {
                    send(res, 404, err);
                    return
                } else if (!userlog){
                    send(res, 200, {
                        "message": "not valid email or password"
                    });
                    return
                }
            });
    }
    else {
        send(res, 200, {
            "message": "No email or password"
        });
    }
};