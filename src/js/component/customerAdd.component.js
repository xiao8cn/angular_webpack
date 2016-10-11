require("../../../static/css/select.css");

export function customerAddComponent() {

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
        controller: function($scope,$http) {

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
                    console.log(res.DBData);
                    ctrl.CUSTOMER_TYPE = res.DBData.CUSTOMER_TYPE;
                    ctrl.INVOICE_TYPE = res.DBData.INVOICE_TYPE;
                })

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

            $scope.open = function() {
                $scope.popup.opened = true;
                console.log($scope.customer);
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.popup = {
                opened: false
            };


        }
    })

}

