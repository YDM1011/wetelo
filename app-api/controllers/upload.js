const mongoose = require('mongoose');
const multiparty = require('multiparty');
const fs = require('fs');
const md5 = require('md5');
const User = mongoose.model('user');
const data = require('../../config/index');
const path = require('path');

const errPage = res => {
    const err = new Error('ops, this page not found');
    err.status = 404;
    res.locals.message = err.message;
    res.locals.error = '';
    res.status(err.status);
    res.render('error');
};
function send(res, status, mes){
    res.status(status);
    res.json(mes);
};
module.exports.uploadFile = (req,res)=>{
    const form = new multiparty.Form();
    const uploadFile = {uploadPath: '', type: '', size: 0};
    const maxSize = 200 * 1024 * 1024; //200MB
    const supportMimeTypes = ['application/pdf'];
    const errors = [];
    form.on('error', function(err){
        if(fs.existsSync(uploadFile.path)) {
            fs.unlinkSync(uploadFile.path);
        }
    });

    form.on('close', function() {
        if(errors.length == 0) {
            send(res, 200, {src: uploadFile.linkConnect});
        }
        else {
            if(fs.existsSync(uploadFile.path)) {
                fs.unlinkSync(uploadFile.path);
            }
            send(res, 404, {status: 'error', errors: errors});
        }
    });

    form.on('part', function(part) {
        uploadFile.size = part.byteCount;
        uploadFile.type = part.headers['content-type'];
        uploadFile.link = `./app-client/files/${md5(part.filename)}.pdf`;
        uploadFile.linkConnect = `files/${md5(part.filename)}.pdf?#scrollbar=0&toolbar=0&navpanes=0`;
        uploadFile.path = uploadFile.link;

        if(uploadFile.size > maxSize) {
            errors.push('File size is ' + uploadFile.size / 1024 / 1024 + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
        }

        if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
            errors.push('Unsupported mimetype ' + uploadFile.type);
        }

        if(errors.length == 0) {
            var out = fs.createWriteStream(uploadFile.path);
            part.pipe(out);
        }
        else {
            part.resume();
        }
    });

    form.parse(req)
};