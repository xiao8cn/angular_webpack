require("../../../static/css/select.css");

import { contactCustComponent } from "../component/contactCust.component";

export function customerAddComponent() {

    contactCustComponent();

    angular.module("scm").filter('propsFilter', function() {
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

    //然后 DataTables 这样初始化：
    angular.module("scm").component("customerAddComponent", {
        templateUrl : "../../src/html/customer/customer_add_component.html",
        bindings : {
        },
        controller: function($scope,$http,$uibModal) {

            var ctrl = this,
                param = {
                    "RequestID":"9999",
                    "RequestFormat":"JSON",
                    "SessionKey":"2ac30b56-7804-44ae-9523-3328eedc7633",
                    "SessionTimeout":"60",
                    "Version":"1.0",
                    "DBRequest":{
                        "Field":[
                            {
                                "UDF_CODE":[
                                    "CUSTOMER_TYPE",
                                    "INVOICE_TYPE",
                                    "TAX_TYPE",
                                    "IMPORTANCE_DEGREE",
                                    "TRADE",
                                    "AREA",
                                    "CHANNEL"
                                ]
                            },
                            "UDF_ID",
                            "UDF_ITEM_NAME"
                        ],
                        "Page":{
                            "Start":"1",
                            "End":"30"
                        }
                    }
                };
            $scope.customer={};

            param = JSON.stringify(param);

            $http.jsonp(`http://10.99.2.61:8083/SCM/SystemBase/Udf/getmutiUdf?callback=JSON_CALLBACK&param=${param}`)
                .success(res => {
                    console.log(JSON.stringify(res.DBData.CUSTOMER_TYPE));
                    ctrl.CUSTOMER_TYPE = res.DBData.CUSTOMER_TYPE;
                    ctrl.INVOICE_TYPE = res.DBData.INVOICE_TYPE;
                    ctrl.TAX_TYPE = res.DBData.TAX_TYPE;
                    ctrl.IMPORTANCE_DEGREE = res.DBData.IMPORTANCE_DEGREE;
                    ctrl.TRADE = res.DBData.TRADE;
                    ctrl.AREA = res.DBData.AREA;
                    ctrl.CHANNEL = res.DBData.CHANNEL;
                })

            ctrl.CUSTOMER_STATUS = [{"id":"1", "text":"启用"}, {"id":"2", "text":"禁用"}];

            $scope.today = function() {
                $scope.dt = new Date();
            };

            $scope.today();

            $scope.clear = function() {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2030, 5, 22),
                minDate: new Date(1970,5,22),
                startingDay: 1
            };

            $scope.open = function(val) {
                console.log($scope.myForm);
                $scope.popup[val].opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.popup = [{
                opened: false
            },{
                opened: false
            },{
                opened: false
            }]

            // CONTACT_CUST_NAME_CN

            ctrl.openModal = () =>{
                var modalInstance = $uibModal.open({
                    animation: true,
                    size : "lg",
                    // appendTo: document.querySelector("table_modal"),
                    component: 'contactCustComponent',
                    // windowClass:"addScmModal",
                    resolve: {

                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function ($scope) {
                    console.log($scope);
                    $log.info('modal-component dismissed at: ' + new Date());
                });
            }


        }
    })

}

