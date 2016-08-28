/**
 * Created by MUHAMMAD MATEEN on 19-Jun-16.
 */


var express = require("express");
var Mozscape = require('mozscape').Mozscape;
var schema = require("../schema/addBlogs");
var update_blogSchema = schema.addBlogs;

var api = express.Router();

var moz = new Mozscape('mozscape-248c5abf37', '6aed937922ce01ddde2fac9e8d8038ae');


api.get('/getblogsda',function(req,res)
{
    update_blogSchema.find({},{_id:1,blogUrl:1,DA:1},function(err,data)
    {
        if(data)
        {
            res.status(200).send(data);
        }
        else
        {
            res.status(204).send(err);                 //204 No content matched
        }
    });
});

api.put("/updatemozda",function(req,res)
{


    moz.urlMetrics(req.body.blogUrl, ['domain_authority'], function(apiErr, apiRes) {
        if (apiRes) {
            if(req.body.DA != apiRes.pda)
            {
                //call update method
                update_blogSchema.update({_id:req.body._id},{$set:{DA:apiRes.pda}},function(err,data)
                {
                    if(data)
                    {
                        res.status(200).send(data);
                    }
                    else
                    {
                        res.status(400).send(err);                 //update failed
                    }
                });
            }else
            {
                res.status(200).send("Already Updated")
            }
        }
        else
        {
            res.status(400).send(apiErr);
        }
    });

});


module.exports = api;