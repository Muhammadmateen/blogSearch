/*** Created by MUHAMMAD MATEEN on 03-Mar-16.*/


(function()
{
    angular.module("blogApp")

        .controller("invitationsController",['$http','toast_service','$state','heroku_url',invitationsController])

    function invitationsController($http,toast_service,$state,heroku_url)
    {
        var _self = this;
        _self.users ;
        _self.loader = true;
        _self.noDataFound = false;
        _self.dataFound = false;


        function userData()
        {
            $http.post(heroku_url+"/getUsers").then(function(data)
            {
                _self.loader  = false;
                if(data.status == 200)
                {
                    _self.dataFound = true;
                    _self.users = data.data;
                }
                else if(data.status == 204)
                {
                    _self.noDataFound = true;
                }
                else
                {
                    toast_service.showSimpleToast(data.data);
                }
            },function(err)
            {
                _self.loader  = false;
                toast_service.showSimpleToast("Internal Server Error");
                console.log(err);
            });
        };
        userData();



        //Update User Details
        _self.updateDetails = function(a,b)
        {
            $http.put(heroku_url+"/updaterole",{id:a,role:b}).then(function(data)
            {
                if(data.status != 500)
                {
                    toast_service.showSimpleToast("User data updated");
                    $state.go($state.current,{},{reload:true});
                }
                else
                {
                    toast_service.showSimpleToast(data.data);
                }

            },function(err)
            {
                toast_service.showSimpleToast("Internal Server Error");
                console.log(err)
            });
        };

        //Expand more logo appearance
        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    }

}());
