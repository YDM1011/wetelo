const mongoose = require('mongoose');
const User = mongoose.model('user');
const Book = mongoose.model('book');


function send(res, status, mes){
    res.status(status);
    res.json(mes);
};

module.exports = (req,res)=>{
    const search = req.body;
    if(search && search.token) {
        User.findOne({token: search.token})
            .exec((err, user) => {
                if (!user) {
                    send(res, 404, {
                        "message": "No book"
                    });
                    return;
                } else if (err) {
                    send(res, 404, err);
                    return;
                }
                /* find book for search */
                const qs = String(search.search);
                const query   = {$and: [{userId: user._id}, {$or: [{title: qs},{name: qs}]} ]};
                const options = {
                    populate: 'book',
                    lean:     true,
                    limit:    3
                };
                Book.paginate(query, options).then(function(result) {
                    send(res, 200, result)
                });

                /* end */
            });
    }
    else {
        send(res, 404, {
            "message": "No book"
        });
    }

};
