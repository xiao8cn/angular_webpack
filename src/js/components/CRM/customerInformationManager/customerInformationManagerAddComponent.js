import template from "./customerInformationManagerAdd.html";
import selectCss from "../../../../../static/css/select.css";
import { CommonComponentBox } from "../../../common/global_val";

const customerInformationManagerAddComponent = {
    template : template,
    bindings : {
        close: '&',
        dismiss: '&'
    },
    style : selectCss,
    controller: function($scope,$http,$uibModal,scmAjaxService) {
        let ctrl = this,
            param = {
                "RequestID":"9999",
                "RequestFormat":"JSON",
                "SessionKey":"072bf31c-b05e-4641-8174-09d0e7d4141a",
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

        ctrl.openModal = val =>{
            var modalInstance = $uibModal.open({
                animation: true,
                size : "lg",
                component: 'commonBoxComponent',
                resolve: {
                    option : function(){
                        return CommonComponentBox[val];
                    }
                }
            });

            modalInstance.result.then(selectedItem=>{
                $scope.myForm[val] = selectedItem.entity;
                if($scope.myForm.$$success.commonBox){
                    $scope.myForm.$$success.commonBox[val] = selectedItem.entity;
                }else{
                    $scope.myForm.$$success.commonBox = {};
                    $scope.myForm.$$success.commonBox[val] = selectedItem.entity;
                }
                console.log($scope.myForm[val]);
            }, function ($scope) {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        }

        ctrl.save = ()=> {
            console.log($scope.myForm);
            console.log("保存");

            if($scope.myForm.$valid){

                let data ={};

                $scope.myForm.$$success.parse.map(res=>{
                    data[res.$name] = res.$viewValue
                })

                for(let key in $scope.myForm.$$success.commonBox){
                    data[key] = $scope.myForm.$$success.commonBox[key][key];
                }

                console.log(data);
                console.log(JSON.stringify(data));

                let param = {
                    "RequestID":"9999",
                    "RequestFormat":"JSON",
                    "SessionKey":"072bf31c-b05e-4641-8174-09d0e7d4141a",
                    "SessionTimeout":"60",
                    "Version":"1.0",
                    "DBRequest":{
                        "Field":[
                            data
                        ],
                        "Page":{
                            "Start":"1",
                            "End":"30"
                        }
                    }
                };

                scmAjaxService.getAjaxJsonp("http://10.99.2.61:8083/SCM/CRM/CUSTOMER/insertCustomer",param)
                    .then(res=>{
                        console.log(res);
                        ctrl.close({$value: "success"});
                    });
            }else{
                console.log("验证未通过");
            }
        }

        ctrl.cancel = ()=>{
            ctrl.dismiss({$value: 'cancel'});
        }
    }
}

export default customerInformationManagerAddComponent;