/*Created by MUHAMMAD MATEEN on 28-Feb-16.*/


(function()
{
    angular.module("blogApp")

        .controller("addBlogsController",['$http','toast_service','$timeout','$mdSidenav','$scope','addBlogsService',addBlogsController])

    function addBlogsController($http,toast_service,$timeout,$mdSidenav,$scope,addBlogsService)
    {
        var _self = this;
        _self.abcdef = [];

        $scope.csv = {
            content: null,
            header: true,
            headerVisible: true,
            separator: ',',
            separatorVisible: true,
            result: null,
            encoding: 'ISO-8859-1',
            encodingVisible: true,
        };

        var _lastGoodResult = '';
        $scope.toPrettyJSON = function (json, tabWidth) {
            var objStr = JSON.stringify(json);
            var obj = null;
            try {
                obj = $parse(objStr)({});
            } catch(e){
                // eat $parse error
                return _lastGoodResult;
            }

            var result = JSON.stringify(obj, null, Number(tabWidth));
            _lastGoodResult = result;

            return result;
        };

        _self.seeData = function()
        {
            if($scope.csv.result == "[]")
            {
                toast_service.showSimpleToast("Provided File is empty");
            }
            else {
                addBlogsService.csvImportData($scope.csv.result);
                //console.log($scope.csv.result);
            }
        }

        _self.addData = function()
        {
            if(_self.data.blogUrl)
            {
                addBlogsService.csvImportData(_self.data);
            }
            else
            {
                toast_service.showSimpleToast("Please Enter URL");
            }
        }

    }

}());