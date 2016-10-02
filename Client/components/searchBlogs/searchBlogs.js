/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */


(function()
{
    angular.module("blogApp")

        .controller("searchBlogsController",['$http','toast_service','exportExcelService','$scope','$mdMedia','$mdDialog','heroku_url',searchBlogsController])

    function searchBlogsController($http,toast_service,exportExcelService,$scope,$mdMedia,$mdDialog,heroku_url)
    {
        var _self = this;
        _self.loader = false;
        _self.matchedItem = [];

        _self.blogCategory = [];
        _self.location = [];


        //Get Site categories
        $http({method:'GET',url:heroku_url+'/getSiteCategories'}).then(function(data)
        {
            if(data.status == 200)
            {
                _self.blogCategory = data.data;
            }
            //console.log("Data of sitecategory : ",data);
        }/*,function(err)
        {
            console.log("Error in sending Request of sitecategory : ",err);
        }*/);

        //Get Locations
        $http({method:'GET',url:heroku_url+'/getLocations'}).then(function(data)
        {
            if(data.status == 200)
            {
                _self.location = data.data;
            }
            //console.log("Data of location : ",data);
        }/*,function(err)
        {
            console.log("Error in sending Request of location : ",err);
        }*/);


        _self.exportExcelFile = function()
        {
           exportExcelService.exportExcel();
        }

        _self.searchBy = {
            blogUrl:"Blog Url",
            siteCategory:"Site category",
            DA:"DA",
            CF:"CF",
            TF:"TF",
            preWrittenRate:"Pre Written Rate",
            bloggerRate:"Blogger Rate",
            negotiatedRate:"Negotiated Rate",
            bloggerName:"Blogger Name",
            location:"Location",
            contactDetails:"Contact Details",
            comments:"Comments",
            acceptCasino:"Accept Casino",
            siteType:"Site Type",
            acceptDofollow:"Accept Dofollow",
            googleIndex:"Google Index",
            ipAddress:"Ip Address",
            blogSource:"Blog Source",
            participated:"Participated"
        }

        _self.hundredNo = [];

        for(var i=0;i<=100;i++)
         {
         _self.hundredNo.push(i);
         }



        /*_self.hundredNo =   [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                            21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
                            41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
                            61,62,53,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
                            81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
*/




        _self.totalSelectedItem = 0;
        _self.checkSelectedItem = function(a)
        {
            if (_self.selectedItem[a] == false) {
                _self.totalSelectedItem--;
                console.log("Items false : ",_self.blog);
                //console.log("Selected Item ",_self.totalSelectedItem);
                if(_self.blog)
                {
                    delete _self.blog[a];
                }
            }
            else
            {
                _self.totalSelectedItem++;
                console.log("Items true : ",_self.blog);
                //console.log("Selected Item ",_self.totalSelectedItem);
            }
        };

        //_self.man.type.abcd = ['name','Father Name'];

        /*_self.search = function()
        {
            console.log("Sending Data : ",_self.blog);
            $http({method:'GET',url:'/searchBlogs',params:_self.blog}).then(function(data)
            {
                //console.log(typeof(_self.blog.siteCategory));
                console.log("Data : ",data);
                if(data.status == 200)
                {
                    _self.matchedItem = data.data;
                    console.log("Data found ",_self.matchedItem);
                }
                else
                {
                    _self.matchedItem = null;
                    toast_service.showSimpleToast("No record found")
                    console.log("No data found",data.data);
                }

            },function(err)
            {
                toast_service.showSimpleToast(err.status+" : Internal server error");
                console.log("Error ",err);
            })
        };*/

        _self.search = function()
        {
            var blogData = angular.copy(_self.blog);
            if(_self.blog.blogUrl){
                //alter blog url
                var alter_blog_Url = {
                    '$regex': blogData.blogUrl
                }
                blogData.blogUrl = alter_blog_Url;
            }
            $http.post(heroku_url+'/searchBlogs',blogData).then(function(data)
            {
                console.log("Data : ",data);
                if(data.status == 200)
                {
                    _self.matchedItem = data.data;
                    console.log("Data found ",_self.matchedItem);
                }
                else
                {
                    _self.matchedItem = null;
                    toast_service.showSimpleToast("No record found")
                    console.log("No data found",data.data);
                }

            },function(err)
            {
                toast_service.showSimpleToast(err.status+" : Internal server error");
                console.log("Error ",err);
            })
        };




        _self.deleteBlog = function(id,index)
        {
            $http.delete(heroku_url+"/deleteBlogItem/"+id).then(function(data)
            {
                if(data.status == 200)
                {
                    _self.matchedItem.splice(index,1);
                    toast_service.showSimpleToast("Deleted Successfully");
                }
                else
                {
                    toast_service.showSimpleToast("Error : No data deleted");
                }

            },function(err)
            {
                toast_service.showSimpleToast(data.status+" : Internal server error");
            });
        };

        _self.editBlog = function(ev,item,$index)
        {
            console.log("Data ",item);
            //console.log("Index ",$index);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                $mdDialog.show({
                        controller:'updateBlogController',
                        controllerAs:'updateBlog',
                        templateUrl: 'components/updateBlog/updateBlog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen,
                        local:item,
                    })
                   /* .then(function(answer) {
                        console.log("ABCD ",answer);

                    }, function() {
                        console.log("DEFG : ",answer);
                    });*/
               /* $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });*/
        };


        /*angular.forEach(_self.selectedItem,function(key,val)
         {
         if(key)
         {
         console.log("Selected Keys : ",key);
         console.log("Selected Val : ",val);
         }
         })*/




        /*_self.items = [{
            name: "John Smith",
            email: "j.smith@example.com",
            dob: "1985-10-10"
        }, {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            dob: "1988-12-22"
        }, {
            name: "Jan Smith",
            email: "jan.smith@example.com",
            dob: "2010-01-02"
        }, {
            name: "Jake Smith",
            email: "jake.smith@exmaple.com",
            dob: "2009-03-21"
        }, {
            name: "Josh Smith",
            email: "josh@example.com",
            dob: "2011-12-12"
        }, {
            name: "Jessie Smith",
            email: "jess@example.com",
            dob: "2004-10-12"
        }];*/



        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    }

}());
