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


        _self.login_auth =   function()
        {
            _self.loader = true;
            $http.post("/login",_self.user).then(function(data)
            {
                _self.loader = false;
                if(data.status == 200)
                {
                    toast_service.showSimpleToast("Welcome "+data.data.name);
                    $state.go("dashboard.searchBlogs");
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

        /*_self.abcdef = function()
        {
            authService.redirect1();
            console.log("sdbfnmmmmm")
        }*/
    }
})();