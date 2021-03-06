/**
 * Created by Mateen Bhai on 3/19/2016.
 */


var express = require("express");
var schema = require("../schema/addBlogs");
var searchBlog_schema = schema.addBlogs;


var api = express.Router();

api.post("/searchBlogs",function(req,res)
{
    console.log("Query is : ",req.body)
    searchBlog_schema.find(req.body,function(err,data)
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

api.get("/getSiteCategories",function(req,res)
{
    searchBlog_schema.distinct("siteCategory",function(err,data)
    {
        if(data)
        {
            //console.log("All sitecategory : ",data);
            res.status(200).send(data);
        }
        else
        {
            //console.log("Error in sitecategory : ",err);
            res.status(204).send(data);
        }
    })
});


api.get("/getLocations",function(req,res)
{
    searchBlog_schema.distinct("location",function(err,data)
    {
        if(data)
        {
            //console.log("All Locations : ",data);
            res.status(200).send(data);
        }
        else
        {
            //console.log("Error in location : ",err);
            res.status(204).send(data);
        }

    });
});


module.exports = api;