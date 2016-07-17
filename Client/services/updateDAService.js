/**
 * Created by Mateen Bhai on 4/5/2016.
 */
(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('updateDAService',function($http,toast_service,$q,heroku_url)
        {
            var obj = {};
            obj.blogsDA;
            obj.updateDalength = 0;

            obj.updateData = function()
            {
                obj.updateDalength++;
                console.log(obj.updateDalength);
            }

            //
            obj.updateMozBlogDA = function()
            {
                $http.get(heroku_url+"/getblogsda").then(function(data)
                {

                    if(data.status == 200)
                    {
                        console.log("Data found ",data.data);
                        obj.blogsDA = data.data;
                        updateDa();
                    }
                    else
                    {
                        //toast_service.showSimpleToast("No record found");
                        console.log("No data found",data.data);
                    }

                },function(err)
                {
                    toast_service.showSimpleToast(data.status+" : Internal server error");
                    console.log("Error ",err);
                })
            };


            var updateDa = function()
            {
                for(var i = 0; i < obj.blogsDA.length; i++)
                {
                    $http.put(heroku_url+"/updatemozda",obj.blogsDA[i]).then(function(data)
                    {
                        console.log("Index : "+i+" with data ",data);
                        obj.updateDalength = obj.updateDalength+1;

                    },function(err)
                    {
                        console.log("Index : "+i+"Error : ",err);
                    })
                }
            };

            return obj;
        })

})();