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
                    console.log("OK OK ");
                    console.log("Data : ",data.data);
                    localStorage.setItem("abcd",JSON.stringify({1:'A',2:'B'}));
                    console.log(typeof(localStorage.getItem('abcd')));
                    localStorage.setItem("loggedInUser",JSON.stringify(data.data));
                    toast_service.showSimpleToast("Welcome "+data.data.name);
                    if(data.data.role == 1)
                    {
                        $state.go("dashboard.searchBlogs");
                        console.log(data.data);
                        console.log("Localstorage",loggedInUser);
                    }
                    else if(data.data.role == 2)
                    {
                        $state.go("dashboard.searchBlogs");
                        console.log(data.data);
                        console.log("Localstorage",loggedInUser);
                    }
                    else
                    {
                        $state.go("dashboard.searchBlogs");
                        console.log(data.data);
                        console.log("Localstorage",loggedInUser);
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
            //$http.post("/login",_self.user)
        };

        /*_self.abcdef = function()
        {
            authService.redirect1();
            console.log("sdbfnmmmmm")
        }*/
    }
})();