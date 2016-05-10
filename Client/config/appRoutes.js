/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */


(function () {
    'use strict';
    angular.module("blogApp")
        .constant("heroku_url","")
        .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {

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


            $stateProvider.state('home', {
                    url: '/home',
                    isLoggedIn:false,
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/home/home.html'
                        }
                    }
                })

                .state('login', {
                    url: '/login',
                    isLoggedIn:false,
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
                    isLoggedIn:false,
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
                    isLoggedIn:false,
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
                    isLoggedIn:false,
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
                    isLoggedIn:true,
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
                    isLoggedIn:true,
                    templateUrl: 'components/addBlogs/addBlogs.html',
                    controller: 'addBlogsController',
                    controllerAs: 'addBlogs'
                })

                .state('dashboard.invitations', {
                    url: '/invitations',
                    isLoggedIn:true,
                    templateUrl: 'components/invitations/invitations.html',
                    controller: 'invitationsController',
                    controllerAs: 'invitations'
                })


                .state('404', {
                    url: '/404',
                    isLoggedIn:false,
                    views: {
                        'nav': navLoginBar,
                        'main': {
                            templateUrl: 'components/404/404.html'
                        }
                    }
                })

            $urlRouterProvider.otherwise( function($injector, $location) {
                		var $state = $injector.get("$state");
                		$state.go("home");
                	});

            //$locationProvider.html5Mode(true);

            /*$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });*/
        })
        .run(function ($rootScope, $state,authService) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                authService.userStatus(toState,event);
            });

            /*$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
                    console.log("State not Found");
                })*/
        })
})();