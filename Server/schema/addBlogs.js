/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */

var mongoose = require("mongoose");

var schema = mongoose.Schema({
    blogUrl:{
        type:String
        ,unique:true,
        required:true
    },
    siteCategory:{
        type:[String]
    },
    DA:{
        type:Number
    },
    PR:{
        type:Number
    },
    TF:{
        type:Number
    },
    siteType:{
        type:String
    },
    preWrittenRate:{
        type:Number
    },
    bloggerWriteRate:{
        type:Number
    },
    acceptDofollow:{
        type:String
    },
    negotiated:{
        type:String
    },
    bloggerName:{
        type:String
    },
    contactDetails:{
        type:String
    },
    blogSource:{
        type:String
    },
    comments:{
        type:String
    },
    participated:{
        type:String
    }
});


//Export the schema
exports.addBlogs = mongoose.model("BlogCampaigns",schema);