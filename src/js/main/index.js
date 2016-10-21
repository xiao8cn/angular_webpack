import "ui-select";
import "bootstrap";
import "angular-ui-grid";
import "angular-ui-bootstrap";
import "angular-ui-router";
import "../common/angular-locale_zh-cn";

import indexComponent from "./index.component";
import ComponentsModule from "../components/components";
import servicesModule from "../service/services";

let scm_web = angular.module("scm",[
    servicesModule.name,
    ComponentsModule.name,
    'ui.router',
    'ui.bootstrap',
    'ui.select',
]);

scm_web.config(function($stateProvider,$locationProvider) {
    var states = [{
        name: 'hello',
        url: '/hello',
        component : 'scmTable',
        resolve: {
            option : function(){
                let href = "https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json",
                    option = {
                    href : href,
                    title:"test列表a",
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
                        "SessionKey":"052dbe18-27ce-4577-bfdb-0928b540b1cc",
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
                        paginationPageSizes: [10, 20, 30],
                        paginationPageSize: 10,
                        enableCellEditOnFocus : true,
                        enableGridMenu : true,
                        multiSelect : true ,
                        enableSelectAll : false,
                        useExternalPagination: true,
                        // enableFullRowSelection : true,
                        columnDefs : [
                            { name: 'GID', enableCellEdit: false, displayName:"编号",enableColumnMenu: false },
                            { name: 'AREA', enableCellEdit: false, displayName:'地区',   enableColumnMenu: false},
                            { name: 'CUSTOMER_CODE', enableCellEdit: false, displayName:'客户代码',enableColumnMenu: false },
                            { name: 'NAME_CN', enableCellEdit: false,displayName: '客户名称',enableColumnMenu: false },
                            { name: 'NAME_EN', enableCellEdit: false,displayName: '英文名称',enableColumnMenu: false},
                            { name: 'CUSTOMER_TYPE_NAME', enableCellEdit: false,displayName: '企业类型',enableColumnMenu: false},
                            { name: 'TRADE_NAME', enableCellEdit: false,displayName: '行业',enableColumnMenu: false},
                            { name: 'CONTACTS', enableCellEdit: false,displayName: '联系人', enableColumnMenu: false},
                            { name: 'TEL', enableCellEdit: false,displayName: '联系电话', enableColumnMenu: false},
                            { name: 'ADDRESS', enableCellEdit: false,displayName: '注册地址', enableColumnMenu: false},
                            { name: 'CUSTOMER_STATUS_NAME', enableCellEdit: false,displayName: '状态', enableColumnMenu: false},
                            { name: 'IMPORTANCE_DEGREE', enableCellEdit: false,displayName: '客户重要度', enableColumnMenu: false},
                            { name: 'INVOICE_TYPE_NAME', enableCellEdit: false,displayName: '发票种类', enableColumnMenu: false},
                            { name: 'PUR_MAN_TEL', enableCellEdit: false,displayName: '销售手机号码', enableColumnMenu: false},
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

    $locationProvider.html5Mode(true)
});

scm_web.component('app',indexComponent);

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
                        resolve(res);
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
                        $scope.gridOptions.data = res.DBData || [];
                        param.DBRequest.Where = oldWhere;
                    });
                })
        }
    };
    return new serviceInstance();
});
