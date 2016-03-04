/**
 * Created by MUHAMMAD MATEEN on 04-Mar-16.
 */

var express = require("express");
var model = require("../schema/userSignUp.js")
var getUsers_model = model.sign_up_schema;

var api = express.Router();


/*api.use("/getUsers",function(req,res,next)
 {
 console.log("Api Middleware of getUsers");
 next();
 })*/

api.post("/updateUsers",function(req,res)
{
    getUsers_model.update({_id:req.body.id},{$set:{role:req.body.role}},function(err,data)
    {
        if (data)
        {
            console.log("Data",data);
            res.status(200).send(data);
        }
        else
        {
            res.status(404).send("No data updated",err);
        }
    });
})

module.exports = api;