/*** Created by MUHAMMAD MATEEN on 03-Mar-16.*/


(function()
{
    angular.module("blogApp")

        .controller("invitationsController",['$http','toast_service','$state',invitationsController])

    function invitationsController($http,toast_service,$state)
    {
        var _self = this;
        _self.users ;

        function userData()
        {
            $http.post("/getUsers").then(function(data)
            {
                if(data.data != "No data found")
                {
                    _self.users = data.data;
                    console.log("Data in controller ",data);
                }
                else
                {
                    console.log("No record found");
                }

            },function(err)
            {
                console.log("Request not send",err);
            });
        };
        userData();

        _self.updateDetails = function(a,b)
        {
            $http.post("/updateUsers",{id:a,role:b}).then(function(data)
            {
                console.log("Updated Data ",data);
                $state.go($state.current,{},{reload:true});

            },function(err)
            {
                console.log("Request not send",err);
            });
        }

        //Expand more logo appearance
        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    }

}());
