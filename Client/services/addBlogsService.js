/**
 * Created by MUHAMMAD MATEEN on 03-Mar-16.
 */


(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('addBlogsService',function($http,toast_service,$q)
        {
            var obj = {};

            //CSV file data
            obj.csvFile = function(fileData)
            {
                var deffer = $q.defer();
                $http.post("/addBlogsFile",fileData).then(function(data)
                {
                    console.log("Data : ",data);
                    deffer.resolve(false);
                    toast_service.showSimpleToast(data.data);
                },function(err)
                {
                    console.log("Error : ",err);
                    deffer.resolve(false);
                    toast_service.showSimpleToast(err.data);
                })
                return deffer.promise;
            }


            //Single Blog item data
            obj.blogItem = function(fileData)
            {
                var deffer = $q.defer();
                $http.post("/addBlogsItem",fileData).then(function(data)
                {
                    console.log("Data : ",data);
                    deffer.resolve(false);
                    toast_service.showSimpleToast(data.data);
                },function(err)
                {
                    console.log("Error : ",err);
                    deffer.resolve(false);
                    toast_service.showSimpleToast(err.data);
                })
                return deffer.promise;
            };



            return obj;
        })

})();