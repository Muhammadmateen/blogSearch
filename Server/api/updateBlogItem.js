/**
 * Created by Mateen Bhai on 3/21/2016.
 */
/**
 * Created by Mateen Bhai on 3/21/2016.
 */
var express = require("express");
var schema = require("../schema/addBlogs");
var Blog_schema = schema.addBlogs;


var api = express.Router();

api.post("/updateBlogItem",function(req,res)
{
    Blog_schema.update({_id:req.body.id},function(err,data)
    {
        if (data)
        {
            console.log("Data : ",data);
        }
        else
        {
            console.log("Error : ",err);
        }
    });
});


module.exports = api;