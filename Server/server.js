/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */



/*==========================Node Modules dependency=======================*/
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var session = require('express-session');

/*Local connection*/
mongoose.connect("mongodb://localhost/blogs");
/*Mongolab connection*/
/*mongoose.connect('mongodb://mateen:mateen@ds061325.mongolab.com:61325/blogdash');*/


/*=========================Require Api=========================*/

var userStatus_api = require("./api/userStatus.js")
var signUp_api = require("./api/signUp.js");
var login_api = require("./api/login.js");
var addBlogs_api = require("./api/addBlogs.js");
var getUsers_api = require("./api/getUsers.js");
var updateUsers_api = require("./api/updateUsers.js")
var verifyUser_api = require("./api/verifyUser.js");
var searchBlogs_api = require("./api/searchBlogs.js");
var deleteBlogItem_api = require("./api/deleteBlogItem.js");
var updateBlogItem_api = require("./api/updateBlogItem.js");



/*=====================Initialize express app==============================*/
var app = express();


/*=====================Files Path====================================*/
//Path of files
var viewsPath = path.resolve(__dirname,"../client");
app.use(express.static(viewsPath));



/*=====================Files Path====================================*/
/*
// serve all asset files from necessary directories
app.use("../client/components/404", express.static(__dirname + "../client/components/404"));
app.use("../client/components/addBlogs", express.static(__dirname + "../client/components/addBlogs"));
app.use("../client/components/dashboard", express.static(__dirname + "../client/components/dashboard"));
app.use("../client/components/forgot", express.static(__dirname + "../client/components/forgot"));
app.use("../client/components/home", express.static(__dirname + "../client/components/home"));
app.use("../client/components/invitations", express.static(__dirname + "../client/components/invitations"));
app.use("../client/components/login", express.static(__dirname + "../client/components/login"));
app.use("../client/components/nav-loginBar", express.static(__dirname + "../client/components/nav-loginBar"));
app.use("../client/components/nav-toolBar", express.static(__dirname + "../client/components/nav-toolBar"));
app.use("../client/components/searchBlogs", express.static(__dirname + "../client/components/searchBlogs"));
app.use("../client/components/sign-up", express.static(__dirname + "../client/components/sign-up"));
app.use("../client/components/simple-toolBar", express.static(__dirname + "../client/components/simple-toolBar"));
app.use("../client/components/updateBlog", express.static(__dirname + "../client/components/updateBlog"));
app.use("../client/components/verifyUser", express.static(__dirname + "../client/components/verifyUser"));


// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/!*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "../client" });
});
*/



/*=====================Body Parser====================================*/

// Using body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


/*=====================Sessions====================================*/
app.use(session({
    secret:"ksdf5i01siu8sdfj7mjsdi",
    resave:true,
    saveUninitialized: true,
    cookie:{
        maxAge:8.64e+7
    }
    /*expire:8.64e+7*/
}))

/*==================Post request on server using Api===========================*/

app.get('/userStatus',userStatus_api);

/*Sign up*/
app.post('/sign_up_user',signUp_api);

/*Check email address in database*/
app.post('/check_email',signUp_api);

/*User authentication (Login) */
app.get('/login',login_api);

/*User logout*/
app.post('/logout',function(req,res)
{
    delete req.session.loginUserDetails;
    res.status(200).send("ok");
})

/*Add CSV Blogs file*/
app.post('/addBlogsFile',addBlogs_api);

/*Add blog item*/
app.post('/addBlogsItem',addBlogs_api);

/*Get all new users request for approval*/
app.post('/getUsers',getUsers_api);

/*Access user to as A Member or admin*/
app.post('/updateUsers',updateUsers_api);

/*Verify user Account*/
app.post('/verifyUser',verifyUser_api);

/*Search Blogs*/
app.post('/searchBlogs',searchBlogs_api);


/*Update Blog Item*/
app.put('/updateBlogItem',updateBlogItem_api);


/*Delete Blog Item*/
app.delete('/deleteBlogItem/:id',deleteBlogItem_api);

/*Get list of sites Categories*/
app.get('/getSiteCategories',searchBlogs_api);

/*Get list of Location (Country)*/
app.get('/getLocations',searchBlogs_api);


/*
 app.post('/fileConversion',conversionApi);*/



/*======================Set port environment==============================*/

app.set('port',process.env.PORT || 4000);
app.listen(app.get('port'),function()
{
    console.log("App running on port : 4000");
})