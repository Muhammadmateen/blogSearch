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

        var mozDA = getMozDA(req.body.blogUrl);
        if(mozDA[0])
        {
            if(req.body.DA != mozDA[1])
            {
                //call update method
                update_blogSchema.update({_id:blogsDA[i]._id},{$set:{DA:mozDA[1]}},function(err,data)
                {
                    if(data)
                    {
                        console.log("Data updated",data);
                        res.status(200).send("DA updated " ,data);
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
            res.status(400).send("Error : ",mozDA[1]);
        }
});





/* var blogsDA


   /!* Get all blogs DA , blogUrl and _id*!/
api.use("/updatemozda",function(req,res)
{
    update_blogSchema.find({},{_id:1,blogUrl:1,DA:1},function(err,data)
    {
        if(data)
        {
            blogsDA = data;
            console.log("Data fetched",data);
            res.next();

            //res.status(200).send(data);
        }
        else
        {
            console.log("Error in fetching record ",err);
            res.status(204).send(err);                 //204 No content matched
        }
    });
});


    /!*Update all blogs DA*!/
api.put("/updatemozda",function(req,res)
{

    console.log("Length og Blog Data : ",blogsDA.length);
    for(var i = 0; i < blogsDA.length; i++)
    {
       var mozDA = getMozDA(blogsDA[i].blogUrl);
        if(mozDA[0])
        {
            if(blogsDA[i].DA != mozDA[1])
            {
                //call update method
                update_blogSchema.update({_id:blogsDA[i]._id},{$set:{DA:mozDA[1]}},function(err,data)
                {
                    if(data)
                    {
                        console.log("Data fetched",data);
                        //res.status(200).send(true);
                    }
                    else
                    {
                        console.log("Error in fetching record ",err);
                        //res.status(204).send(err);                 //204 No content matched
                    }
                });
            }
        }
        else
        {
            res.send("Error : ",mozDA[1]);
        }
    }



});*/



function getMozDA(url)
{

    moz.urlMetrics(url, ['domain_authority'], function(err, res) {
        if (res) {
            console.log("Result in mozscape api : ",res);
            return [true,res];
        }
        console.log("Error in mozscape api : ",err);
        return [false,err];
    });
};






/*var moz = new Mozscape('mozscape-248c5abf37', '6aed937922ce01ddde2fac9e8d8038ae');
moz.urlMetrics('www.google.com', ['title','url', 'links','domain_authority'], function(err, res) {
    if (err) {
        console.log("Error in mozscape api : ",err);
        return;
    }

    console.log("Result in mozscape api : ",res);
});*/




module.exports = api;