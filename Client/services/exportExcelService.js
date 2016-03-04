/**
 * Created by MUHAMMAD MATEEN on 04-Mar-16.
 */

(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('exportExcelService',function($http,toast_service,FileSaver,Blob)
        {
            var obj = {};

            obj.exportExcel = function()
            {
                var blob = new Blob([document.getElementById('exportable').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                FileSaver.saveAs(blob, "Report.xls");
            }

            return obj;
        })

})();