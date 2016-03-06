/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */


(function () {
    'use strict';
    angular.module("blogApp")
        .config(function ($stateProvider, $urlRouterProvider) {
            var navLoginBar = {
                templateUrl: 'components/nav-loginBar/nav-loginBar.html',
                controller: 'navLoginBarController',
                controllerAs: 'navLoginBar'
            }

            var navToolBar = {
                templateUrl: 'components/nav-toolBar/nav-toolBar.html',
                controller: 'navToolBarController',
                controllerAs: 'navToolBar'
            }


            $stateProvider.state('/', {
                    url: '/',
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/home/home.html'
                        }
                    }
                })

                .state('login', {
                    url: '/login',
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/login/login.html',
                            controller: 'loginController',
                            controllerAs: 'login'
                        }
                    }
                })

                .state('sign-up', {
                    url: '/sign-up',
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/sign-up/sign-up.html',
                            controller: 'signUpController',
                            controllerAs: 'signUp'
                        }
                    }
                })

                .state('forgot', {
                    url: '/forgot',
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/forgot/forgot.html',
                            controller: 'forgotController',
                            controllerAs: 'forgot'
                        }
                    }
                })

                .state('verify-account',{
                    url:'/verify-account/:id',
                    views:{
                        'nav' : {
                            templateUrl:'components/simple-toolBar/simple-toolBar.html'
                        },
                        'main':{
                            templateUrl:'components/verifyUser/verifyUser.html',
                            controller:'verifyUserController',
                            controllerAs:'verifyUser'
                        }
                    }
                })

                .state('dashboard', {
                    abstract: true,
                    url: '/dashboard',
                    views: {
                        'nav': navToolBar,
                        'main': {
                            templateUrl: 'components/dashboard/dashboard.html',
                            controller: 'dashboardController',
                            controllerAs: 'dashboard'
                        }
                    }
                })

                .state('dashboard.searchBlogs', {
                    url: '/searchBlogs',
                    views: {
                        'main': {
                            templateUrl: 'components/searchBlogs/searchBlogs.html',
                            controller: 'searchBlogsController',
                            controllerAs: 'searchBlogs'
                        }
                    }
                })

                .state('dashboard.addBlogs', {
                    url: '/addblogs',
                    templateUrl: 'components/addBlogs/addBlogs.html',
                    controller: 'addBlogsController',
                    controllerAs: 'addBlogs'
                })

                .state('dashboard.invitations', {
                    url: '/invitations',
                    templateUrl: 'components/invitations/invitations.html',
                    controller: 'invitationsController',
                    controllerAs: 'invitations'
                })


                .state('404', {
                    url: '/404',
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/404/404.html'
                        }
                    }
                })

            $urlRouterProvider.otherwise('404');
        })
        /*.run(['$rootScope', '$state',function($rootScope,$state)
        {
            $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams){
                var abc = localStorage.getItem("uid");

                console.log(abc);
                if(abc == "mateen")
                {
                    $state.transitionTo('/');
                    e.preventDefault();
                }
                else
                {
                    $state.go("sign-up");
                    e.preventDefault();
                }

            });
        }])*/

})();