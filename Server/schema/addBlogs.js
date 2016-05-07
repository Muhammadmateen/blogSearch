/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */

var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    blogUrl:{
        type:String,
        unique: true,
        required:true
    },
    DA:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    TF:{
        type:Number,
        min:0,
        max:100
    },
    CF:{
        type:Number,
        min:0,
        max:100
    },
    preWrittenRate:{
        type:Number
    },
    bloggerRate:{
        type:Number
    },
    negotiatedRate:{
        type:Number
    },
    bloggerName:{
        type:String
    },
    location:{
        type:String
    },
    contactDetails:{
        type:String
    },
    comments:{
        type:String
    },
    acceptCasino:{
        type:String,
        enum:['yes','no']
    },
    siteType:{
        type:String,
        enum:['real','bpn']
    },
    acceptDofollow:{
        type:String,
        enum:['yes','no']
    },
    googleIndex:{
        type:String,
        enum:['de-index','index']
    },
    ipAddress:{
      type:String
    },
    blogSource:{
        type:String
    },
    participated:{
        type:String
    },
    siteCategory:{
        type:[String]
    }
});


//Export the schema
exports.addBlogs = mongoose.model("blogCampaigns",schema);