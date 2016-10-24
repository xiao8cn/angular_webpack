import template from "./customerInformationManagerAdd.html";
import selectCss from "../../../../../static/css/select.css";
import { CommonComponentBox } from "../../../common/global_val";

const customerInformationManagerAddComponent = {
    template : template,
    bindings : {
        resolve:'<',
        close: '&',
        dismiss: '&'
    },
    style : selectCss,
    controller: function($scope,$http,$uibModal,scmAjaxService) {
        let ctrl = this,
            param = {
                "RequestID":"9999",
                "RequestFormat":"JSON",
                "SessionKey":"bee07180-a4cb-4c34-9191-436eca665608",
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

            ctrl.$onInit = function(){
                $scope.customer = ctrl.resolve.customer || {};
                $scope.customer.PUR_ORG = {};
                $scope.customer.PUR_ORG.ORG_NAME = $scope.customer.ORG_NAME;
                $scope.customer.PUR_MAN = {};
                $scope.customer.PUR_MAN.NAME_CN = $scope.customer.SALES_NAME_CN;
                $scope.buttonType = ctrl.resolve.buttonType;
                console.log($scope.customer);
            }

        /*let aaaparam = `param={"requestId":"123","page":{"start":"1","pageSize":"1"},"conditions":[{"field":"GID","value":"2","option":"0"}],"order":[{"field":"CREATE_TIME","type":"1"}]}`;

         $http({
         method : "POST",
         url : "http://10.99.2.61:8082/SCM/PUB/pubStoreHouseQuery",
         data : aaaparam,
         withCredentials: true,
         headers : {
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         'Accept' : "application/json, text/javascript, *!/!*; q=0.01",
         }
         }).success(res=>{
         console.log(res);
         })*/

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

                if($scope.customer.CUSTOMER_TYPE){
                    $scope.customer.CUSTOMER_TYPE = ctrl.CUSTOMER_TYPE.filter(res=>res.id == $scope.customer.CUSTOMER_TYPE)[0]
                }
                if($scope.customer.INVOICE_TYPE){
                    $scope.customer.INVOICE_TYPE = ctrl.INVOICE_TYPE.filter(res=>res.id == $scope.customer.INVOICE_TYPE)[0]
                }

                // $scope.customer.CUSTOMER_TYPE = ctrl.CUSTOMER_TYPE[0];
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
                    $scope.customer[val] = selectedItem.entity;
                }else{
                    $scope.myForm.$$success.commonBox = {};
                    $scope.myForm.$$success.commonBox[val] = selectedItem.entity;
                    $scope.customer[val] = selectedItem.entity;
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
                    "SessionKey":"bee07180-a4cb-4c34-9191-436eca665608",
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

        ctrl.modify = ()=>{
            console.log("修改");

            if($scope.myForm.$valid){

                let data ={};

                if($scope.myForm.$$success.parse){
                    $scope.myForm.$$success.parse.map(res=>{
                        console.log(typeof res.$viewValue);
                        if(typeof res.$viewValue === "object"){
                            data[res.$name] = res.$viewValue.id
                        }else{
                            data[res.$name] = res.$viewValue
                        }
                    })
                }

                if($scope.myForm.$$success.commonBox){
                    for(let key in $scope.myForm.$$success.commonBox){
                        let valueKey = document.querySelector(`input[key=${key}]`).getAttribute("keyText");
                        data[key] = $scope.myForm.$$success.commonBox[key][valueKey];
                    }
                }

                console.log(data);
                console.log(JSON.stringify(data));

                let param = {
                    "RequestID":"9999",
                    "RequestFormat":"JSON",
                    "SessionKey":"bee07180-a4cb-4c34-9191-436eca665608",
                    "SessionTimeout":"60",
                    "Version":"1.0",
                    "DBRequest":{
                        "Field": data,
                        "Where" :` GID = ${$scope.customer.GID} `
                    }
                };

                console.log(param);

                scmAjaxService.getAjaxJsonp("http://10.99.2.61:8083/SCM/CRM/CUSTOMER/updateCustomer",param)
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