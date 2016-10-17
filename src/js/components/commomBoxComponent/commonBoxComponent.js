import template from "./commonBoxComponent.html";

const commonBoxComponent = {
    template : template,
    bindings : {
        resolve : "<",
        close: '&',
        dismiss: '&'
    },
    controller: function ($scope,$log,$http,i18nService,scmAjaxService) {

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
        $scope.gridOptions = gridOption;
        $scope.gridOptions.enableCellEditOnFocus = gridOption.enableCellEditOnFocus || true;
        $scope.gridOptions.enableGridMenu = gridOption.enableGridMenu || true;
        $scope.gridOptions.paginationPageSizes = gridOption.paginationPageSizes || [5, 10, 20];
        $scope.gridOptions.paginationPageSize = gridOption.paginationPageSize || 5;
        $scope.gridOptions.multiSelect = gridOption.multiSelect || false;
        if(!gridOption.columnDefs){
            $scope.gridOptions.columnDefs = [
                { name: 'CUSTOMER_CODE', enableCellEdit: false,displayName:"客户编码" ,enableColumnMenu: false},
                { name: 'NAME_CN', enableCellEdit: false,displayName:"客户名称" ,enableColumnMenu: false},
                { name: 'PUR_ORG', enableCellEdit: false,displayName:"销售组织" ,enableColumnMenu: false},
                { name: 'IMPORTANCE_NAME', enableCellEdit: false,displayName:"客户等级" ,enableColumnMenu: false},
                { name: 'CONTACTS', enableCellEdit: false,displayName:"联系人" ,enableColumnMenu: false},
                { name: 'ADDRESS', enableCellEdit: false,displayName:"地址" ,enableColumnMenu: false},
            ];
        }else{
            console.log(gridOption.columnDefs);
            $scope.gridOptions.columnDefs = gridOption.columnDefs;
        }

        scmAjaxService.getAjaxJsonp(href,param)
            .then(res=>{
                $scope.gridOptions.data = res;
                this.search();
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

            console.log(data);
            scmAjaxService.searchCommonBox(data,href,param,$scope)
        };

        $scope.gridOptions.onRegisterApi = function(gridApi){
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                if(row.isSelected){
                    ctrl.selectRow = row;
                }else{
                    ctrl.selectRow = {};
                }
            });
        };

        ctrl.save = ()=> {
            console.log(ctrl.selectRow);
            ctrl.close({$value: ctrl.selectRow});
        }

        ctrl.cancel = ()=>{
            ctrl.dismiss({$value: 'cancel'});
        }

    }
}

export default commonBoxComponent;