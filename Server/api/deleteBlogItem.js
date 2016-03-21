/**
 * Created by Mateen Bhai on 3/21/2016.
 */
var express = require("express");
var schema = require("../schema/addBlogs");
var Blog_schema = schema.addBlogs;


var api = express.Router();

api.delete("/deleteBlogItem/:id",function(req,res)
{
    Blog_schema.remove({_id:req.params.id},function(err,data)
    {
        if (data)
        {
           console.log("Data : ",data);
            res.send(data);
        }
        else
        {
           console.log("Error : ",err);
            res.send(err);
        }
    });
});


module.exports = api;