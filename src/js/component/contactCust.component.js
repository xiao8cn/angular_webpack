let contactCustHtml = require("../../../src/html/common/contactCust.html");

export function contactCustComponent() {

    angular.module("scm")
        .service("scmAjaxService",function($http){
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

    //然后 DataTables 这样初始化：
    angular.module("scm").component("contactCustComponent", {
        template : contactCustHtml,
        bindings : {
            option : "<"
        },
        controller: function ($scope,$log,$http,i18nService,scmAjaxService) {

            let ctrl = this,
                option = ctrl.option || {},
                href = option.href,
                lang = option.lang || "zh-cn",
                gridOption = option.gridOption || {},
                param = JSON.stringify(option.param);

            i18nService.setCurrentLang(lang);

            this.title = option.title || "往来户";
            this.customer = {};

            $scope.gridOptions = gridOption;
            $scope.gridOptions.enableCellEditOnFocus = true;
            $scope.gridOptions.enableGridMenu = true;


            $scope.gridOptions.paginationPageSizes = [5, 10, 20];
            $scope.gridOptions.paginationPageSize = 5;
            $scope.gridOptions.multiSelect = false;

            if(!gridOption.columnDefs){
                $scope.gridOptions.columnDefs = [
                    { name: 'CUSTOMER_CODE', enableCellEdit: false,displayName:"客户编码" ,enableColumnMenu: false},
                    { name: 'NAME_CN', enableCellEdit: false,displayName:"客户名称" ,enableColumnMenu: false},
                    { name: 'PUR_ORG', enableCellEdit: false,displayName:"销售组织" ,enableColumnMenu: false},
                    { name: 'IMPORTANCE_NAME', enableCellEdit: false,displayName:"客户等级" ,enableColumnMenu: false},
                    { name: 'CONTACTS', enableCellEdit: false,displayName:"联系人" ,enableColumnMenu: false},
                    { name: 'ADDRESS', enableCellEdit: false,displayName:"地址" ,enableColumnMenu: false},
                ];
            }

            href = "http://10.99.2.61:8083/SCM/BusinessBase/Customer/getCustomer";
            param = {
                "RequestID":"9999",
                "RequestFormat":"JSON",
                "SessionKey":"e7ba24d2-8806-46bf-831c-ca1e9e8620fb",
                "SessionTimeout":"60",
                "Version":"1.0",
                "DBRequest":{
                    "Field":[
                        "ALLFIELDS"
                    ],
                    "Where":"CUSTOMER_STATUS like 9 ",
                    "Page":{
                        "Start":"1",
                        "End":"10"
                    }
                }
            }

            scmAjaxService.getAjaxJsonp(href,param)
                .then(res=>{
                    $scope.gridOptions.data = res;
                })

            ctrl.search = (val) => scmAjaxService.searchCommonBox(val,href,param,$scope);

            $scope.gridOptions.onRegisterApi = function(gridApi){
                gridApi.selection.on.rowSelectionChanged($scope,function(row){
                    console.log(123);
                    var msg = 'row selected ' + row.isSelected;
                    $log.log(msg);
                });
            };

        }
    })
}

