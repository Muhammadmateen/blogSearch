/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */



    angular.module("blogApp")
        .factory("authService",['$state','$q','$http','$location',function($state,$q,$http,$location)
        {
            var authServiceObj = {};

           /* authServiceObj.localData =  function()
            {
                return JSON.parse(localStorage.getItem("loggedInUser"));
            };

            authServiceObj.userStatus = function(stateName)
            {
                var loggedInUser = authServiceObj.localData();
                    if(loggedInUser.uid && loggedInUser.name && loggedInUser.role)
                    {
                        $http.post("/userStatus",loggedInUser).then(function(data)
                        {
                            if(data.data == true)
                            {
                                $location.url("dashboard.searchBlogs");

                            }
                            else
                            {
                                //console.log(data.data);
                                $location.url("login");
                            }

                        },function(err)
                        {
                            console.log("Request not send for check user status");
                            console.log("Error",err);
                        })
                    }
                    else
                    {
                       $location.url("login");
                    }
            }*/

            return authServiceObj;
        }]);
