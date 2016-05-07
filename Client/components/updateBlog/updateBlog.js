/*** Created by Mateen Bhai on 3/22/2016.*/


(function()
{
    angular.module("blogApp")
        .controller("updateBlogController",['$http','local','$mdDialog','toast_service',updateBlogController])

    function updateBlogController($http,local,$mdDialog,toast_service)
    {

        var _self = this;
        _self.data = local;

        _self.updateCancel = function()
        {
            $mdDialog.cancel();
        }

        _self.updateBlogData = function()
        {
            console.log("Data for update : ",_self.data);
            if(_self.data && _self.data.blogUrl && _self.data._id && _self.data.DA)
            {
                $http.put("/updateBlogItem",_self.data).then(function(data)
                {
                    console.log("After update : ",data);
                    if(data.status == 200)
                    {
                        toast_service.showSimpleToast("Data Updated Successfully");
                        $mdDialog.cancel();
                    }
                    else
                    {
                        toast_service.showSimpleToast(data.data);
                        $mdDialog.cancel();
                    }
                },function(err)
                {
                    console.log("After update err : ",data);
                    toast_service.showSimpleToast("Error : ",data.data);
                    $mdDialog.cancel();
                });
            }
        };

    }
})();