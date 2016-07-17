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
            console.log("Data fetched",data);
            res.status(200).send(data);
        }
        else
        {
            console.log("Error in fetching record ",err);
            res.status(204).send(err);                 //204 No content matched
        }
    });
});

api.put("/updatemozda",function(req,res)
{

    console.log("Data in body : ",req.body);


    moz.urlMetrics(req.body.blogUrl, ['domain_authority'], function(apiErr, apiRes) {
        if (apiRes) {
            console.log("Result in mozscape api : ",apiRes);
            if(req.body.DA != apiRes.pda)
            {
                //call update method
                console.log("ID : "+req.body._id + " ",req.body.blogUrl);
                update_blogSchema.update({blogUrl:req.body._id},{$set:{DA:apiRes.pda}},function(err,data)
                {
                    if(data)
                    {
                        console.log("Data updated",data);
                        res.status(200).send(data);
                    }
                    else
                    {
                        console.log("Error in updating record ",err);
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
            console.log("Error in mozscape api url is : "+req.body.blogUrl+" ",apiErr);
            res.status(400).send(apiErr);
        }
    });

});


module.exports = api;