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

api.post("/getUsers",function(req,res)
{
    getUsers_model.find({role:3},function(err,data)
    {
        if (data)
        {
            if(data.length == 0)
            {
                console.log("Data come empty",data);
                res.status(200).send("No data found");
            }
            else
            {
                console.log("Data fill",data);
                res.status(200).send(data);
            }
        }
        else
        {
            res.status(404).send("No New Request Found",err);
        }
    });
})

module.exports = api;