/*** Created by MUHAMMAD MATEEN on 20-Jun-16.*/


(function()
{
    angular.module("blogApp")
        .controller("updateDAController",['$http','updateDAService',updateDAController])

    function updateDAController($http,updateDAService)
    {

        var _self = this;
        _self.totalLength = updateDAService.blogsDA;
        //_self.updatedLength = updateDAService.updateDalength;
        _self.updatedLength = updateDAService.updateDalength;
        _self.isDisabled = true;


        _self.updateAllDa = function()
        {

            updateDAService.updateData();
            /////console.log("Update all da function call in controller");
//            console.log(_self.updatedLength);
            //updateMozBlogDA();
        };

    }
})();