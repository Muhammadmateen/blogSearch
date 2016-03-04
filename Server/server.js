/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */



/*==========================Node Modules dependency=======================*/
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

/*Local connection*/
/*mongoose.connect("mongodb://localhost/blogs");*/
/*Mongolab connection*/
mongoose.connect('mongodb://mateen:mateen@ds061325.mongolab.com:61325/blogdash');


/*=========================Require Api=========================*/

var signUp_api = require("./api/signUp.js");
var login_api = require("./api/login.js");
var addBlogs_api = require("./api/addBlogs.js");
var getUsers_api = require("./api/getUsers.js");
var updateUsers_api = require("./api/updateUsers.js")



/*=====================Initialize express app==============================*/
var app = express();



//Path of files
var viewsPath = path.resolve(__dirname,"../client");
app.use(express.static(viewsPath));

// Using body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


/*==================Post request on server using Api===========================*/

/*Sign up*/
app.post('/sign_up_user',signUp_api);

/*Check email address in database*/
app.post('/check_email',signUp_api);

/*User authentication (Login) */
app.post('/login',login_api);

/*Add CSV Blogs*/
app.post('/addBlogs',addBlogs_api);

/*Get all new users request for approval*/
app.post('/getUsers',getUsers_api);

/**/
app.post('/updateUsers',updateUsers_api);

/*Search Blogs*/
/*app.post('/search',searchBlogs_api);*/

/*app.post('/verify_account',verify_account_api);


 app.post('/fileConversion',conversionApi);*/



/*======================Set port environment==============================*/

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),function()
{
    console.log("App running on port : 3000");
})