/*** Created by MUHAMMAD MATEEN on 20-Jun-16.*/


(function()
{
    angular.module("blogApp")
        .controller("updateDAController",['$http','updateDAService','heroku_url',updateDAController])

    function updateDAController($http,updateDAService,heroku_url)
    {

        var _self = this;
        _self.loader = false;
        _self.blogsDA;
        _self.totalLength = 0;
        _self.updatedLength = 0;
        _self.isDisabled = true;




        _self.updateAllDa = function()
        {
            _self.loader = true;

            $http.get(heroku_url+"/getblogsda").then(function(data)
            {

                if(data.status == 200)
                {
                    _self.blogsDA = data.data;
                    _self.totalLength = _self.blogsDA.length;
                    console.log("Blogs Length : ",_self.blogsDA.length);
                    console.log("All Item fetched of DA fetched : ",_self.blogsDA);
                    getUpdateDa();
                }
                else
                {
                    //toast_service.showSimpleToast("No record found");
                    console.log("No data found in blogsDA",data.data);
                }

            },function(err)
            {
                toast_service.showSimpleToast(data.status+" : Internal server error");
                console.log("Error ",err);
            })

            updateDAService.updateData();
            /////console.log("Update all da function call in controller");
//            console.log(_self.updatedLength);
            //updateMozBlogDA();
        };


        var updatedError = 0;

        var getUpdateDa = function()
        {
            for(var i = 0; i < _self.blogsDA.length; i++)
            {
                $http.put(heroku_url+"/updatemozda",_self.blogsDA[i]).then(function(data)
                {
                    console.log("Index : "+i+" with data ",data);
                    _self.updateDalength = _self.updateDalength+1;

                },function(err)
                {
                    console.log("Index : "+i+"Error : ",err);
                    updatedError = updatedError+1;
                    console.log("error updated da length : ",updatedError);
                    //Break Loop if wanted
                })
            }
        };

    }
})();