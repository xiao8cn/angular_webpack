export function tableService(){

    angular.module("scm").service("tableService",function($http){
        var service = {
            jsonpData : function(href) {

                let aaa = '{"RequestID":"9999","RequestFormat":"JSON","SessionKey":"4428ee56-77e3-46d3-9270-7782caffc139","SessionTimeout":"60","Version":"1.0","DBRequest":{"Field":["ALLFIELDS"],"Where":"1=1 order by GID desc","Page":{"Start":"1","End":"10"}}}';

                $http.jsonp(`${href}?callback=JSON_CALLBACK&param=${aaa}`)
                    .success(res => {
                        console.log(res);
                        return res.DBData;
                    })
            }
        }
        return service;
    })

}