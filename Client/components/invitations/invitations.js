/*** Created by MUHAMMAD MATEEN on 03-Mar-16.*/


(function()
{
    angular.module("blogApp")

        .controller("invitationsController",['$http','toast_service','$state',invitationsController])

    function invitationsController($http,toast_service,$state)
    {
        var _self = this;
        _self.users ;
        _self.loader = true;
        _self.noDataFound = false;
        _self.dataFound = false;


        function userData()
        {
            $http.post("/getUsers").then(function(data)
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



        //_self.sNo = 0;
       /* _self.checkRole = function(role)
        {
            //console.log("Value :",role)
            if(role == 3)
            {
                return true;
            }
            else
            {
                //console.log("2")
                return false;
            }

        }
*/

        //Update User Details
        _self.updateDetails = function(a,b)
        {
            $http.post("/updateUsers",{id:a,role:b}).then(function(data)
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
        }

        //Expand more logo appearance
        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    }

}());
