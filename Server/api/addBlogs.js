/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */

var express = require("express");


var schema = require("../schema/addBlogs");
var addBlogs_schema = schema.addBlogs;

var api = express.Router();



api.post("/addBlogsFile", function (req, res) {

    addBlogs_schema.insertMany(req.body, function (err, success) {
        if (err) {
            console.log("Error : ",err);
            if(err.errors)
            {
                console.log("Error : ",err);
                //10.4.16 415 Unsupported Media Type (content type)
                res.status(415).send("Invalid data in file");
            }
            else if(err.code == 11000)
            {
                console.log("Error : ",err);
                res.status(202).send("Duplicate URL Error : First "+err.index+" records data save");
            }
            else
            {

                console.log("Error : ",err);
                res.status(500).send(err.message);
            }
        }
        else {
            console.log("Success : ",success);
            //res.status(200).send(success);
            res.status(200).send("File Data uploaded");
        }
    });


})

api.post("/addBlogsItem",function(req,res)
{
    var blog_schema = new addBlogs_schema(req.body);
    blog_schema.save(function(err,success)
    {
        if(err)
        {
            if(err.errors)
            {
                console.log("Error : ",err);
                //10.4.16 415 Unsupported Media Type (content type)
                res.status(415).send("Invalid data provided");
            }
            else if(err.code == 11000)
            {
                console.log("Error : ",err);
                res.status(415).send("Provided Url already exist");
            }
            else
            {

                console.log("Error : ",err);
                res.status(500).send(err.message);
            }
        }
        else
        {
            console.log("Success : ",success);
            res.status(200).send("Data save successfully");
        }
    })
});

//Export the Api
module.exports = api;