/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */


(function()
{
    angular.module("blogApp")

        .controller("searchBlogsController",['$http','toast_service','exportExcelService','$scope','$mdMedia','$mdDialog',searchBlogsController])

    function searchBlogsController($http,toast_service,exportExcelService,$scope,$mdMedia,$mdDialog)
    {
        var _self = this;
        _self.loader = false;
        _self.matchedItem = [] ;

        _self.exportExcelFile = function()
        {
            exportExcelService.exportExcel();
        }

        _self.searchBy = {
            blogUrl:"Blog Url",
            siteCategory:"Site category",
            DA:"DA",
            PR:"PR",
            TF:"TF",
            siteType:"Site Type",
            preWrittenRate:"Pre Written Rate",
            bloggerWriteRate:"Blogger Write Rate",
            acceptDofollow:"Accept Dofollow",
            negotiated:"Negotiated",
            bloggerName:"Blogger Name",
            contactDetails:"Contact Details",
            blogSource:"Blog Source",
            comments:"Comments",
            participated:"Participated"
        }

        _self.hundredNo = [];

        for(var i=0;i<=100;i++)
         {
         _self.hundredNo.push(i);
         }

        _self.blogCategory = ['social','technology','fashion','medical'];

        /*_self.hundredNo =   [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                            21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
                            41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
                            61,62,53,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
                            81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
*/




        _self.checkSelectedItem = function(a)
        {
            if (_self.selectedItem[a] == false) {
                if(_self.blog)
                {
                    delete _self.blog[a];
                }
            }
        }

        //_self.man.type.abcd = ['name','Father Name'];

        _self.search = function()
        {
            $http({method:'GET',url:'/searchBlogs',params:_self.blog}).then(function(data)
            {
                console.log(_self.blog);
                //console.log(typeof(_self.blog.siteCategory));
                console.log("Data : ",data);
                if(data.status == 200)
                {
                    _self.matchedItem = data.data;
                    console.log("Data found ",_self.matchedItem);
                }
                else
                {
                    toast_service.showSimpleToast("No record found");
                    console.log("No data found",data.data);
                }

            },function(err)
            {
                toast_service.showSimpleToast(err.status+" : Internal server error");
                console.log("Error ",err);
            })
            /*if(_self.selectedItem.siteCategory)
            {
                //var siteCategory = [_self.blog.siteCategory.$in];
                _self.blog.siteCategory.$in = [_self.blog.siteCategory.$in];
                searchBlog(_self.blog);
                console.log("If : ",_self.blog);
            }
            else
            {
                searchBlog(_self.blog);
                console.log("Else Query : ",_self.blog);
            }*/
        }

      /* var searchBlog = function(query)
        {

        };*/



        _self.deleteBlog = function(id,index)
        {
            $http.delete("/deleteBlogItem/"+id).then(function(data)
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

        _self.updateBlog = function(ev,item,$index)
        {
            //console.log("Data ",item);
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
        }


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
