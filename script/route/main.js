const path = require('path')
const express = require('express');
const fs = require('fs');

const blogRouter = require(__dirname + '/blog.js');
const developRouter = require(__dirname + '/develop.js');
const gameRouter = require(__dirname + '/game.js');

const router = express();

router.get('/', function (request, response) {
    response.redirect('/hub/index.html')
});

router.use('/hub', express.static(path.join(__dirname, '../../public/hub/home')));

router.use('/blog', blogRouter)
router.use('/develop', developRouter)
router.use('/game', gameRouter)
router.use('/', express.static(path.join(__dirname, '../../public')));

var port = process.env.PORT || 80;
router.listen(port, function () {
    console.log('Jeuk Hwang Site listening on port!')
});
