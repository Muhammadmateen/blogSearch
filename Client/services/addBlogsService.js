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

            obj.csvImportData = function(fileData)
            {
                var deffer = $q.defer();
                $http.post("/addBlogs",fileData).then(function(data)
                {
                    deffer.resolve(false);
                    toast_service.showSimpleToast(data.data);
                },function(err)
                {
                    deffer.resolve(false);
                    toast_service.showSimpleToast(err.data);
                })
                return deffer.promise;
            }

            return obj;
        })

})();