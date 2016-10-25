import template from "./commonBoxComponent.html";
import commonBoxController from "./commonBoxController";

const commonBoxComponent = {
    template,
    bindings : {
        resolve : "<",
        close: '&',
        dismiss: '&'
    },
    controller : commonBoxController
    /*controller: function ($scope,$log,$http,$timeout,i18nService,scmAjaxService) {
        let ctrl = this,
            option = ctrl.resolve.option || {},
            href = option.href,
            lang = option.lang || "zh-cn",
            gridOption = option.gridOptions || {},
            param = option.param;

        $scope.select = {};
        $scope.textdata = {};

        ctrl.$onInit = function(){
            console.log("init");
        }

        $scope.look = function(event){
            console.log(event.select);
        }

        i18nService.setCurrentLang(lang);

        ctrl.title = option.title || "往来户";
        ctrl.wheres = option.wheres || {};
        ctrl.selectRow = {};
        ctrl.gridOptions = gridOption;
        ctrl.gridOptions.enableCellEditOnFocus = gridOption.enableCellEditOnFocus || true;
        ctrl.gridOptions.enableGridMenu = gridOption.enableGridMenu || true;
        ctrl.gridOptions.paginationPageSizes = gridOption.paginationPageSizes || [5, 10, 20];
        ctrl.gridOptions.paginationPageSize = gridOption.paginationPageSize || 5;
        ctrl.gridOptions.multiSelect = gridOption.multiSelect || false;
        ctrl.gridOptions.enableSelectAll = gridOption.enableSelectAll || false;
        if(!gridOption.columnDefs){
            ctrl.gridOptions.columnDefs = [
                { name: 'CUSTOMER_CODE', enableCellEdit: false,displayName:"客户编码" ,enableColumnMenu: false},
                { name: 'NAME_CN', enableCellEdit: false,displayName:"客户名称" ,enableColumnMenu: false},
                { name: 'PUR_ORG', enableCellEdit: false,displayName:"销售组织" ,enableColumnMenu: false},
                { name: 'IMPORTANCE_NAME', enableCellEdit: false,displayName:"客户等级" ,enableColumnMenu: false},
                { name: 'CONTACTS', enableCellEdit: false,displayName:"联系人" ,enableColumnMenu: false},
                { name: 'ADDRESS', enableCellEdit: false,displayName:"地址" ,enableColumnMenu: false},
            ];
        }else{
            ctrl.gridOptions.columnDefs = gridOption.columnDefs;
        }
        ctrl.gridOptions.onRegisterApi = function(gridApi){
            console.log(123);
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                if(row.isSelected){
                    ctrl.selectRow = row;
                }else{
                    ctrl.selectRow = {};
                }
            });
        };

        scmAjaxService.getAjaxJsonp(href,param)
            .then(res=>{
                $timeout(()=>{
                    ctrl.gridOptions.data = res.DBData;
                },100);
            })

        ctrl.search = () => {
            let data = {};

            for(let key in $scope.textdata){
                data[key] = $scope.textdata[key];
            }
            for(let key in $scope.select){
                if($scope.select[key]){
                    data[key] = $scope.select[key].id;
                }
            }
            scmAjaxService.searchCommonBox(data,href,param,$scope)
        };

        ctrl.save = ()=> {
            ctrl.close({$value: ctrl.selectRow});
        }

        ctrl.cancel = ()=>{
            ctrl.dismiss({$value: 'cancel'});
        }

    }*/
}

export default commonBoxComponent;