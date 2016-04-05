/**
 * Created by Mateen Bhai on 4/5/2016.
 */
(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('searchBlogService',function($http,toast_service,$q)
        {
            var obj = {};

            //
            obj.searchBlog = function(query)
            {
                $http.post("/searchBlogs",query).then(function(data)
                {

                    if(data.status == 200)
                    {
                        _self.matchedItem = data.data;
                        console.log("Data found ",_self.matchedItem);
                    }
                    else
                    {
                        toast_service.showSimpleToast("No record found");
                        console.log("No data found",data.data);
                    }

                },function(err)
                {
                    toast_service.showSimpleToast(data.status+" : Internal server error");
                    console.log("Error ",err);
                })
            }

            return obj;
        })

})();