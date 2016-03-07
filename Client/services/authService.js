/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */



    angular.module("blogApp")
        .factory("authService",['$state','$q','$http',function($state,$q,$http)
        {
            var authServiceObj = {};
            var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

            authServiceObj.userStatus = function()
            {
                if(loggedInUser.uid && loggedInUser.name && loggedInUser.role)
                {

                }
            }

            return authServiceObj;
        }]);