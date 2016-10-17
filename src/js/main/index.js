require("ui-select");
require("bootstrap");
require("angular-ui-grid");
require("angular-ui-bootstrap");
require("angular-ui-router");
require("../common/angular-locale_zh-cn");

import indexComponent from "./index.component";

import ComponentsModule from "../components/components";

let scm_web = angular.module("scm",[
    ComponentsModule.name,
    'ui.router',
    'ui.bootstrap',
    'ui.router',
    'ui.select',
]).component('app',indexComponent);

scm_web.config(function($stateProvider) {
    var states = [{
        name: 'hello',
        url: '/hello',
        component : 'scmTable',
        resolve: {
            option : function(){
                let href = "https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json",
                    option = {
                    href : href,
                    title:"test列表",
                    gridOption : {
                        paginationPageSizes: [10, 20, 30],
                        paginationPageSize: 10,
                    }
                }

                return option;
            }
        }
    },{
        name: 'getCustomer',
        url: '/getCustomer',
        component : 'scmTable',
        resolve: {
            option : function(){

                let href = "http://10.99.2.61:8083/SCM/CRM/CUSTOMER/getCustomer",
                    option = {
                    href : href,
                    lang : "zh-cn",
                    title:"客户信息列表",
                    param : {
                        "RequestID":"9999",
                        "RequestFormat":"JSON",
                        "SessionKey":"4428ee56-77e3-46d3-9270-7782caffc139",
                        "SessionTimeout":"60",
                        "Version":"1.0",
                        "DBRequest":{
                            "Field":[
                                "ALLFIELDS"
                            ],
                            "Where":"1=1 order by GID desc",
                            "Page":{
                                "Start":"1",
                                "End":"10"
                            }
                        }
                    },
                    gridOption : {
                        paginationPageSizes: [5, 10, 20],
                        paginationPageSize: 5,
                        columnDefs : [
                            { name: 'GID', enableCellEdit: false, displayName:"编号", },
                            { name: 'AREA', enableCellEditOnFocus:false, displayName:'地区',   },
                            { name: 'CUSTOMER_CODE', enableCellEdit: true, displayName:'客户代码' },
                            { name: 'NAME_CN', displayName: '客户名称', },
                            { name: 'NAME_EN', displayName: '英文名称',},
                            { name: 'CUSTOMER_TYPE_NAME', displayName: '企业类型',},
                            { name: 'TRADE_NAME', displayName: '行业',},
                            { name: 'CONTACTS', displayName: '联系人', },
                            { name: 'TEL', displayName: '联系电话', },
                            { name: 'ADDRESS', displayName: '注册地址', },
                            { name: 'CUSTOMER_STATUS_NAME', displayName: '状态', },
                            { name: 'IMPORTANCE_DEGREE', displayName: '客户重要度', },
                            { name: 'INVOICE_TYPE', displayName: '发票种类', },
                            { name: 'PUR_MAN_TEL', displayName: '销售手机号码', },
                        ]
                    },
                }
                return option;
            },
        }
    }]

    states.forEach(function(state) {
        $stateProvider.state(state);
    });
});

scm_web.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

scm_web.service("scmAjaxService",function($http){
    var serviceInstance = function(){
        this.getAjaxJsonp = (href,param) =>{
            return new Promise((resolve,reject) => {
                param = JSON.stringify(param);
                $http.jsonp(`${href}?callback=JSON_CALLBACK&param=${param}`)
                    .success(res => {
                        resolve(res.DBData);
                    })
                    .error((res,status)=>{
                        reject(res,status)
                    })
            });
        };
        this.searchCommonBox = (val,href,param,$scope)=>{
            let oldWhere = param.DBRequest.Where,
                where = oldWhere;

            for (let key in val){
                if(val[key]){
                    where +=` and ${key} like ${val[key]}`;
                }
            }
            param.DBRequest.Where = where;
            this.getAjaxJsonp(href,param)
                .then(res=>{
                    $scope.$apply(function () {
                        $scope.gridOptions.data = res || [];
                        param.DBRequest.Where = oldWhere;
                    });
                })
        }
    };
    return new serviceInstance();
});
