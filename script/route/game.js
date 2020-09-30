const path = require('path');
const express = require('express');
const fs = require('fs');

const template_submain = require(path.join(__dirname, '../template/template_submain.js'));

const router = express.Router();

router.get('/', function (request, response) {
    fs.readdir(path.join(__dirname, '../../public/game'), function (error, filelist) {
        var list = template_submain.list('game', filelist);
        var html = template_submain.HTML('game', list);
        response.send(html);
    });
});

router.use(express.static(path.join(__dirname, '../../public/game')));

module.exports = router;