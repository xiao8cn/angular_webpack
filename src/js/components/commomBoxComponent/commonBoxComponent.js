import template from "./commonBoxComponent.html";

const commonBoxComponent = {
    template,
    bindings : {
        resolve : "<",
        close: '&',
        dismiss: '&'
    },
    controller: function ($scope,$log,$http,$timeout,i18nService,ajaxService) {
        let ctrl = this,
            option = ctrl.resolve.option || {},
            href = option.href,
            lang = option.lang || "zh-cn",
            gridOption = option.gridOptions || {},
            param = option.param;

        ctrl.select = {};
        ctrl.textdata = {};

        ctrl.$onInit = function(){
            console.log("init");

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
            ctrl.gridOptions.columnDefs = gridOption.columnDefs || [];
            ctrl.gridOptions.onRegisterApi = function(gridApi){
                gridApi.selection.on.rowSelectionChanged($scope,function(row){
                    if(row.isSelected){
                        ctrl.selectRow = row;
                    }else{
                        ctrl.selectRow = {};
                    }
                });
            };

            ajaxService.getAjaxPost(href,param)
                .then(res=>{
                    console.log(res);
                    ctrl.gridOptions.data = res.DBData;
                })
        }

        $scope.look = function(event){
            console.log(event.select);
        }

        ctrl.search = () => {
            let data = {},
                oldWhere = param.DBRequest.Where;

            for(let key in ctrl.textdata){
                data[key] = ctrl.textdata[key];
            }
            for(let key in ctrl.select){
                if($scope.select[key]){
                    data[key] = ctrl.select[key].id;
                }
            }

            ajaxService.searchCommonBox(data,href,param)
                .then(res=>{
                    $timeout(()=>{ctrl.gridOptions.data = res.DBData},10)
                    param.DBRequest.Where = oldWhere;
                })
        };

        ctrl.save = ()=> {
            ctrl.close({$value: ctrl.selectRow});
        }

        ctrl.cancel = ()=>{
            ctrl.dismiss({$value: 'cancel'});
        }

    }
}

export default commonBoxComponent;