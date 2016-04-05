/**
 * Created by Mateen Bhai on 3/19/2016.
 */


var express = require("express");
var schema = require("../schema/addBlogs");
var searchBlog_schema = schema.addBlogs;


var api = express.Router();

api.get("/searchBlogs",function(req,res)
{
    console.log("Query : ",req.query)
    searchBlog_schema.find(req.query,function(err,data)
    {
        if (data)
        {
            if(data.length == 0)
            {
                // 204 No Data Found (No content found)
                res.status(204).send(data);
            }
            else
            {
                // 200 Data Found
                res.status(200).send(data);
            }
        }
        else
        {
            //  Server Error
            res.status(500).send(err);
        }
    })
});


module.exports = api;