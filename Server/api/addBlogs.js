/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */

var express = require("express");


var schema = require("../schema/addBlogs");
var addBlogs_schema = schema.addBlogs;

var api = express.Router();


api.post("/addBlogs", function (req, res) {

    //var save_blogsData = new addBlogs_schema(req.body);
    addBlogs_schema.collection.insert(req.body, function (err, success) {
        if (err) {
            console.log("Error : ", err);
            res.send("Error : "+err);

        }
        else {
            console.log("Sucess : ", success);
            res.send("Sucess : "+success);
        }
    })


})

//Export the Api
module.exports = api;