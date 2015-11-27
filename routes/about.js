/**
 * Created by AVIRAM on 25/11/2015.
 */
var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'About'
        ,sometext:'aviram is king'});
});

module.exports = router;
