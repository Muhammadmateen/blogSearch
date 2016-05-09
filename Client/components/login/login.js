/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */


(function()
{

    angular.module("blogApp")
        .controller("loginController",['$http','toast_service','$state','authService',loginController])

    function loginController($http,toast_service,$state,authService)
    {
        var _self = this;
        _self.loader = false;
        var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        _self.login_auth =   function()
        {
            _self.loader = true;
            $http({method:'GET',url:'/login',params:_self.user}).then(function(data)
            {
                _self.loader = false;
                if(data.status == 200 )
                {
                    localStorage.setItem("loggedInUser",JSON.stringify(data.data));
                    toast_service.showSimpleToast("Welcome "+data.data.name);
                    if(data.data.role == 1)
                    {
                        $state.go("dashboard.searchBlogs");
                    }
                    else if(data.data.role == 2)
                    {
                        $state.go("dashboard.searchBlogs");
                    }
                    else
                    {
                        $state.go("dashboard.searchBlogs");

                    }
                }
                else
                {
                    toast_service.showSimpleToast(data.statusText);
                }

            },function(err)
            {
                _self.loader = false;
                toast_service.showSimpleToast(err.data);
                $state.go($state.current,{},{reload:true})
            });
        };

       /* _self.setLocalData = function()
        {
            localStorage.setItem("loggedInUser",JSON.stringify({name:'Muhammad Mateen',role:2}));
            //console.log("Local Storage Data is set : ",JSON.parse(localStorage.getItem("loggedInUser")));
            /!*authService.redirect1();
            //console.log("sdbfnmmmmm")*!/
        }

        _self.getLocalData = function()
        {
            console.log("Get local Data : ",JSON.parse(localStorage.getItem("loggedInUser")));
        }
*/    }
})();