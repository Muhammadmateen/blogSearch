/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */



    angular.module("blogApp")
        .factory("authService",['$state','$q','$http','$location',function($state,$q,$http,$location)
        {
            var authServiceObj = {};

            authServiceObj.localData =  function()
            {
                return JSON.parse(localStorage.getItem("loggedInUser"));
            };

            authServiceObj.userStatus = function(stateName,event)
            {
                var loggedInUser = authServiceObj.localData();
                if(loggedInUser)
                {
                    if(loggedInUser.uid && loggedInUser.name && loggedInUser.role)
                    {
                        $http.post("/userStatus",loggedInUser).then(function(data)
                        {
                            if(data.status == 200)
                            {
                                if(stateName.isLoggedIn)
                                {
                                    console.log("Redirecting to user page")
                                }
                                else
                                {
                                    event.preventDefault();
                                    $state.go("dashboard.searchBlogs");
                                }
                            }
                        },function(err)
                        {
                            if(stateName.isLoggedIn)
                            {
                                event.preventDefault();
                                $state.go("login");
                                localStorage.removeItem("loggedInUser");
                            }
                        })
                    }
                    else
                    {
                        if(stateName.isLoggedIn)
                        {
                            event.preventDefault();
                            $state.go("login");
                            localStorage.removeItem("loggedInUser");
                        }
                    }

                }
                else
                {
                    if(stateName.isLoggedIn)
                    {
                        event.preventDefault();
                        $state.go("login");
                    }
                }

            };

            return authServiceObj;
        }]);