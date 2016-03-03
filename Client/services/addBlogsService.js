/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */


(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('addBlogsService',function($http,toast_service)
        {
            var obj = {};

            obj.csvImportData = function(fileData)
            {
                $http.post("/addBlogs",fileData).then(function(data)
                {
                    toast_service.showSimpleToast(data);
                    console.log(data);
                },function(err)
                {
                    toast_service.showSimpleToast(err);
                    console.log(err);
                })
            }

            return obj;
        })

})();