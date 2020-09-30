const path = require('path')
const express = require('express');
const fs = require('fs');

const template_submain = require(path.join(__dirname, '../template/template_submain.js'));
const template_body = require((path.join(__dirname, '../template/template_body.js')));

const router = express.Router();

router.get('/', function (request, response) {
    fs.readdir(path.join(__dirname, '../../public/blog'), function (error, filelist) {
        var list = template_submain.list('blog', filelist);
        var html = template_submain.HTML('blog', list);
        response.send(html);
    });
});

router.get('/:title', function (request, response) {
    var title = request.params.title;
    var html = template_body.HTML(title);
    response.send(html);
    //fs.readfile('./data/blog/' + title, function (error, filelist) {
});

module.exports = router;