/*Created by MUHAMMAD MATEEN on 28-Feb-16.*/


(function()
{
    angular.module("blogApp")

        .controller("addBlogsController",['$http','toast_service','$timeout','$mdSidenav','$scope','addBlogsService','$state',addBlogsController])

    function addBlogsController($http,toast_service,$timeout,$mdSidenav,$scope,addBlogsService,$state)
    {
        var _self = this;
        _self.loader = false;

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

        _self.blogFileUpload = function()
        {
            if($scope.csv.result)
            {
                if($scope.csv.result == "[]")
                {
                    toast_service.showSimpleToast("Provided File is empty");
                }
                else
                {
                    _self.loader = true;
                    addBlogsService.csvImportData($scope.csv.result).then(function(data)
                    {
                        _self.loader = data;
                    },function(err)
                    {
                        _self.loader = data;
                    });
                }
            }
            else
            {
                toast_service.showSimpleToast("Select the file first");
            }
        }


        _self.addBlog = function()
        {
            if(_self.data.blogUrl != undefined)
            {
                addBlogsService.csvImportData(_self.data).then(function(data)
                {
                    _self.loader = data;
                    $state.go($state.current,{},{reload:true});
                },function(err)
                {
                    $state.go($state.current,{},{reload:true});
                    _self.loader = data;
                });
            }
            else
            {
                toast_service.showSimpleToast("Please Enter URL");
            }
        }

    }

}());
