/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */


(function()
{
    angular.module("blogApp")

        .controller("searchBlogsController",['$http','toast_service','exportExcelService',searchBlogsController])

    function searchBlogsController($http,toast_service,exportExcelService)
    {
        var _self = this;
        _self.loader = false;

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

        _self.getSelectedItem = function()
        {
            console.log(_self.val);
        }





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
    }

}());
