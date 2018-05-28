const express = require('express');
const router = express.Router();

const upload = require('../controllers/upload');
const addBook = require('../controllers/addbook');
const signUp = require('../controllers/signup');
const signIn = require('../controllers/signin');
const getBooksPage = require('../controllers/getBooksPage');
const deleteBook = require('../controllers/deleteBook');
const editbook = require('../controllers/editbook');
const search = require('../controllers/search');
const status = require('../controllers/status');
const rating = require('../controllers/rating');

router.post('/', function(req, res, next) {
    res.status(200);
    res.json({"books":"all"})
});

router.post('/books/:brif', function(req, res, next) {
    res.status(200);
    res.json({"books":"all post"})
});
router.get('/allPage/:token', function(req, res, next) {
    res.status(200);
    res.json({"last": 3})
});
router.get('/userEmail/:token', function(req, res, next) {
    res.status(200);
    res.json({"email": "ydm1011@gmail.com"})
});
router.post('/getbooks', (req, res)=>{getBooksPage(req,res)});
router.get('/download/:id', (req, res)=>{download(req,res)});

router.delete('/delete/:id', (req,res)=>{deleteBook(req,res)});

router.post('/uploadFile', (req, res)=>{upload.uploadFile(req,res)});
router.post('/addBook', (req, res)=>{addBook(req,res)});
router.post('/signup', (req,res)=>{signUp(req,res)});
router.post('/signin', (req,res)=>{signIn(req,res)});
router.post('/edit', (req,res)=>{editbook(req,res)});
router.post('/search', (req,res)=>{search(req,res)});
router.post('/status', (req,res)=>{status(req,res)});
router.post('/rating', (req,res)=>{rating(req,res)});
module.exports = router;
