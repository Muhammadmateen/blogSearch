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

api.put("/updateBlogItem",function(req,res)
{
    console.log("Query for update : ",req.body);
   // console.log(req.body);
   // res.send("OK");
    Blog_schema.update({_id:req.body._id},
        {$set:req.body
                /*{
                    blogUrl:req.body.blogUrl,
                    DA:req.body.DA,
                    TF:req.body.TF,
                    CF:req.body.CF,
                    preWrittenRate:req.body.preWrittenRate,
                    bloggerRate:req.body.bloggerRate,
                    negotiatedRate:req.body.negotiatedRate,
                    bloggerName:req.body.bloggerName,
                    location:req.body.location,
                    contactDetails:req.body.contactDetails,
                    comments:req.body.comments,
                    acceptCasino:req.body.acceptCasino,
                    siteType:req.body.siteType,
                    acceptDofollow:req.body.acceptDofollow,
                    googleIndex:req.body.googleIndex,
                    ipAddress:req.body.ipAddress,
                    blogSource:req.body.blogSource,
                    participated:req.body.participated,
                    siteCategory:req.body.siteCategory
                }*/
        },{multi:true},function(err,data) {
        if (data)
        {
            console.log("Success : ",data);
            if(data.nModified == 1)
            {
                res.status(200).send("Data Updated");
            }
            else
            {
                res.send(data);
            }
        }
        else
        {
            console.log("Error : ",err);
            res.status(500).send("Internal Server Error");
        }
    });
});


module.exports = api;