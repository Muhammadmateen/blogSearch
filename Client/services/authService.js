/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */



    angular.module("blogApp")
        .factory("authService",['$state','$q','$http','$location','heroku_url',function($state,$q,$http,$location,heroku_url)
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
                    //console.log("Data : ",loggedInUser);
                    if(loggedInUser.uid && loggedInUser.name && loggedInUser.role)
                    {
                        $http({method:'GET',url:heroku_url+'/userStatus',params:loggedInUser}).then(function(data)
                    {
                        if(data.status == 200)
                        {
                            if(stateName.isLoggedIn)
                            {
                                //console.log("Redirecting to user page")
                            }
                            else
                            {
                                event.preventDefault();
                                $state.go("dashboard.searchBlogs");
                            }
                        }
                    },function(err)
                    {
                        //console.log("After http request err working ",err);
                        localStorage.removeItem("loggedInUser");
                        if(stateName.isLoggedIn)
                        {
                            event.preventDefault();
                            $state.go("login");
                        }

                    })
                        /*$http.get("/userStatus",loggedInUser).then(function(data)
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
                        })*/
                    }
                    else
                    {
                        localStorage.removeItem("loggedInUser");
                        //console.log("loggeninuser all paramerter not set localstorage remove");
                        if(stateName.isLoggedIn)
                        {
                            event.preventDefault();
                            $state.go("login");

                        }
                    }

                }
                else
                {
                    //console.log("No local storage found");
                    if(stateName.isLoggedIn)
                    {
                        event.preventDefault();
                        $state.go("login");
                    }
                }

            };

            return authServiceObj;
        }]);