/**
 * Created by AVIRAM on 27/11/2015.
 */

var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    var user_id = req.param('id');
    var num1 = req.param('num1');
    var num2 = req.param('num2');
    var an;

    console.log("api is: "+user_id);

    if (user_id==1)
    {
        if (num1!=null)
            an=num1*num1;
    }
    if (user_id==2)
    {
        if (num1!=null)
            if (num2!=null)
            {
                num1=parseInt(num1);
                num2=parseInt(num2);
                an=num1+num2;
            }
    }
    console.log("an is: "+an);

    res.render('api', {
        title: 'API',
        sometext: 'welcam to API page',
        resoult: an,
    });
});

module.exports = router;
