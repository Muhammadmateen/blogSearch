/*Created by MUHAMMAD MATEEN on 28-Feb-16.*/


(function()
{
    angular.module("blogApp")

        .controller("addBlogsController",['$http','toast_service','$timeout','$mdSidenav','$scope','addBlogsService','$state',addBlogsController])

    function addBlogsController($http,toast_service,$timeout,$mdSidenav,$scope,addBlogsService,$state)
    {
        var _self = this;
        _self.loader = false;

        $scope.csv = {
            content: null,
            header: true,
            headerVisible: true,
            separator: ',',
            separatorVisible: true,
            result: null,
            encoding: 'ISO-8859-1',
            encodingVisible: true,
        };

        var _lastGoodResult = '';
        $scope.toPrettyJSON = function (json, tabWidth) {
            var objStr = JSON.stringify(json);
            var obj = null;
            try {
                obj = $parse(objStr)({});
            } catch(e){
                // eat $parse error
                return _lastGoodResult;
            }

            var result = JSON.stringify(obj, null, Number(tabWidth));
            _lastGoodResult = result;

            return result;
        };

        //CSV blog file
        _self.blogFileUpload = function()
        {
            if($scope.csv.result)
            {
                if($scope.csv.result == "[]")
                {
                    toast_service.showSimpleToast("Provided File is empty");
                }
                else
                {
                    _self.loader = true;
                    addBlogsService.csvFile(_self.correctSampleData).then(function(data)
                    {
                        _self.loader = data;
                    },function(err)
                    {
                        _self.loader = data;
                    });
                }
            }
            else
            {
                toast_service.showSimpleToast("Select the file first");
            }
        }


        //Single blog item
        _self.addBlog = function()
        {
            if(_self.data.blogUrl != undefined)
            {
                addBlogsService.blogItem(_self.correctSampleData).then(function(data)
                {
                    _self.loader = data;
                    $state.go($state.current,{},{reload:true});
                },function(err)
                {
                    $state.go($state.current,{},{reload:true});
                    _self.loader = data;
                });
            }
            else
            {
                toast_service.showSimpleToast("Please Enter URL");
            }
        };

        _self.correctSampleData = [
            {
                blogUrl:"www.yahoo.com",
                siteCategory:['technology','social'],
                DA:32,
                PR:7,
                TF:52,
                siteType:'ab site',
                preWrittenRate:300,
                bloggerWriteRate:250,
                acceptDofollow:'no',
                negotiated:'no',
                bloggerName:'Joshef',
                contactDetails:'UK',
                blogSource:'yahoo',
                comments:'good blogger',
                participated:'yes'
            },{
                blogUrl:"www.google.com",
                siteCategory:['fashion','technology','medical'],
                DA:22,
                PR:8,
                TF:42,
                siteType:'bc site',
                preWrittenRate:220,
                bloggerWriteRate:200,
                acceptDofollow:'no',
                negotiated:'yes',
                bloggerName:'Michel',
                contactDetails:'USA',
                blogSource:'google',
                comments:'responisble blooger',
                participated:'yes'
            },
            {
                blogUrl:'www.facebook.com',
                siteCategory:['social'],
                DA:65,
                PR:3,
                TF:88,
                siteType:'de site',
                preWrittenRate:430,
                bloggerWriteRate:380,
                acceptDofollow:'yes',
                negotiated:'yes',
                bloggerName:'johny',
                contactDetails:'AUS',
                blogSource:'facebook',
                comments:null,
                participated:null
            }/*,
            {
                blogUrl:'www.twitter.com',
                siteCategory:['style','jwellery','gold'],
                DA:85,
                PR:10,
                TF:89,
                siteType:'gh site',
                preWrittenRate:500,
                bloggerWriteRate:455,
                acceptDofollow:'no',
                negotiated:'yes',
                bloggerName:'alpha',
                contactDetails:'malaysia',
                blogSource:null,
                comments:null,
                participated:'yes'
            },
            {
                blogUrl:'www.github.com',
                siteCategory:null,
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            }*/
        ];

        /*_self.wrongSampleData = [
            {
                blogUrl:'www.google.com',           //Error here duplicate value passes
                siteCategory:null,
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            },{
                blogUrl:'www.wikipedia.com',
                siteCategory:'abcd',            //Error here array value passed
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            },{
                blogUrl:'www.gana.com',
                siteCategory:['fashion','songs','movies'],
                DA:'abc',                       //Error data type string passed
                PR:'cde',                       //Error data type string passed
                TF:'fgh',                       //Error data type string passed
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            },{
                blogUrl:'www.panacloud.com',
                siteCategory:['software','house'],
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:'free of cost',             //Error data type string passed
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            }
        ];*/


        //Working on single
        /*_self.singleBlogData1 = {
                blogUrl:123,        //Error data type number passed
                siteCategory:null,
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/


        /*_self.singleBlogData2 = {
                blogUrl:'www.olx2.com',
                siteCategory:'abcd',        //Error data type string passed here array required in string
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/

        /*_self.singleBlogData3 = {
                blogUrl:'www.olx3.com',
                siteCategory:[25,30],        //Error data type int passed here array required in string
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/

        /*_self.singleBlogData4 = {
                blogUrl:'www.olx4.com',
                siteCategory:['ab','cd'],
                DA:'Ab',        //Error data type string passed
                PR:'Bc',        //Error data type string passed
                TF:'De',        //Error data type string passed
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/

    }

}());
