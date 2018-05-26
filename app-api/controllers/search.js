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
                Book.find({userId: user._id})
                    .where('title').equals(search.search)
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
                        send(res, 200, book);

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
