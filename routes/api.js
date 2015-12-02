/**
 * Created by AVIRAM on 27/11/2015.
 */


var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017/users";
var  st="";
var resultFromDB;
var array;

/* GET about page. */
router.get('/', function(req, res, next) {
    var user_id = req.param('id');
    var num1 = req.param('num1');
    var num2 = req.param('num2');
    var username = req.param('username');
    var password = req.param('password');
    var an="";


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

    if (user_id==3)//get all data from db
    {
        var callback = function(err, st) { //Fetch from database
            if(!st)
            {
                //return reply( { error: 'Cant get users!'} );
            }
            return st;
        };

        getAllDataFromDB(callback);
        console.log("get date from db: "+st);
        an=st;
        console.log("in ud==3");
    }
    if (user_id==4) 
    {
        if (username!=null &&password!=null)
        {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                    console.log("some error");
                    return;
                }
                console.log("we are connced");

                //add to db
                var user={
                    "userName":username,
                    "password":password,
                };
                var collection = db.collection('user');
                collection.insert(user);
                console.log("add to DB");
                an="add to DB successfully. username: "+username+", password: "+password;

            });
        }
    }
    console.log("an is: "+an);

    res.render('api', {
        title: 'API',
        sometext: 'welcam to API page',
        resoult: an,
    });

});
var getAllDataFromDB = function(callback)
//function getAllDataFromDB(name,callback) //getAllDataFromDB()
{
   // var st="";

    MongoClient.connect(url, function(err, db) {
        if(err) {
            console.log("some error");
        }
        else
            console.log("we are connced");

        var collection = db.collection('user');

         collection.find().toArray(function(err, items) {
             if (err)
             {
                 console.log("err in try to make arrat");
             }

         for (var i=0; i<items.length; i++)
         {
             st=st+"userName: "+items[i].userName+ "\n";
             st=st+"password: "+items[i].password+ "\n";
         }
             console.log("st1:"+ st);

         });
    });
    callback(null,st);

}
module.exports = router;
