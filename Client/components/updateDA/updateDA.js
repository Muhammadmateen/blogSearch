/*** Created by MUHAMMAD MATEEN on 20-Jun-16.*/


(function()
{
    angular.module("blogApp")
        .controller("updateDAController",['$http','updateDAService','heroku_url','toast_service',updateDAController])

    function updateDAController($http,updateDAService,heroku_url,toast_service)
    {

        var _self = this;
        _self.loader = false;
        _self.blogsDA;
        _self.totalLength = 0;
        _self.updateDalength = 0;
        _self.updatedError = 0;
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
                    getUpdateDa();
                }
                else
                {
                    toast_service.showSimpleToast("No record found");
                    _self.loader = false;
                }

            },function(err)
            {
                toast_service.showSimpleToast(data.status+" : Internal server error");
                _self.loader = false;
                console.log("Error ",err);
            })

            updateDAService.updateData();
        };


        

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
                    _self.updatedError = _self.updatedError+1;
                })
               .finally(function() {
                    if(_self.updatedError+_self.updateDalength == _self.totalLength){
                        _self.loader = false;
                        toast_service.showSimpleToast("Totlal : "+_self.totalLength+" updated : "+_self.updateDalength+" Not Updated : "+_self.updatedError);
                    }
                })
            }
        };

    }
})();