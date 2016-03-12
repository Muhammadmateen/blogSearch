/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */

var express = require("express");


var schema = require("../schema/addBlogs");
var addBlogs_schema = schema.addBlogs;

var api = express.Router();

var noRecordInserted = 0;


api.post("/addBlogs", function (req, res) {

    addBlogs_schema.collection.insert(req.body, function (err, success) {
        if (err) {
            if(err.index == 0)
            {
                res.status(202).send("Duplicate URL Error : No record inserted");
            }
            else
            {
                res.status(202).send("Duplicate URL Error : First "+err.index+" records data uploaded");
            }
        }
        else {
            res.status(200).send("File data uploaded successfully");
        }
    });


})

//Export the Api
module.exports = api;