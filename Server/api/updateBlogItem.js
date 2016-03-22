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

   // console.log(req.body);
   // res.send("OK");
    Blog_schema.update({_id:req.body._id},
        {$set:
                {
                    blogUrl:req.body.blogUrl,
                    siteCategory:req.body.siteCategory,
                    DA:req.body.DA,
                    PR:req.body.PR,
                    TF:req.body.TF,
                    siteType:req.body.siteType,
                    preWrittenRate:req.body.preWrittenRate,
                    bloggerWriteRate:req.body.bloggerWriteRate,
                    acceptDofollow:req.body.acceptDofollow,
                    negotiated:req.body.negotiated,
                    bloggerName:req.body.bloggerName,
                    contactDetails:req.body.contactDetails,
                    blogSource:req.body.blogSource,
                    comments:req.body.comments,
                    participated:req.body.participated
                }
        },{multi:true},function(err,data) {
        if (data)
        {
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
            res.status(500).send("Internal Server Error");
        }
    });
});


module.exports = api;