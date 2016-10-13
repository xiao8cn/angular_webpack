export function tableComponent() {
    //然后 DataTables 这样初始化：
    angular.module("scm").component("tableComponent", {
        template : `
                <div class="panel-group" id="tableComponent1">
                    <div class="panel panel-info">
                        <div class="panel-heading" role="tab" data-toggle="collapse" data-parent="#tableComponent1" href="#tableComponentOne">
                            <h3 class="panel-title accordion-toggle">{{$ctrl.title}}</h3>
                          </div>
                        <div id="tableComponentOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="tableComponent1">
                            <div class="panel-body">
                                <div class="btn-group">
                                    <label class="btn btn-info" ng-model="radioModel" uib-btn-radio="'add'" ng-click="$ctrl.add()">增加</label>
                                    <label class="btn btn-info" ng-model="radioModel" uib-btn-radio="'modify'">修改</label>
                                    <label class="btn btn-info" ng-model="radioModel" uib-btn-radio="'delete'">删除</label>
                                </div>
                                <div ui-grid="gridOptions" ui-grid-edit  ui-grid-pagination ui-grid-cellnav class="grid"></div>
                            </div>
                        </div>
                    </div>
                </div>
                    `,
        bindings : {
            option : "<"
        },
        controller: function ($scope,$http,$log,i18nService,$uibModal) {

            let ctrl = this,
                option = ctrl.option || {},
                href = option.href,
                lang = option.lang || "en",
                gridOption = option.gridOption,
                param = JSON.stringify(option.param);

            console.log(lang);

            i18nService.setCurrentLang(lang);

            this.title = option.title;

            this.add = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size : "lg",
                    // appendTo: document.querySelector("table_modal"),
                    component: 'customerAddComponent',
                    windowClass:"addScmModal",
                    resolve: {

                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function ($scope) {
                    console.log($scope);
                    // $log.info('modal-component dismissed at: ' + new Date());
                });
            }

            $scope.gridOptions = gridOption;
            $scope.gridOptions.enableCellEditOnFocus = true;

            if(!gridOption.columnDefs){
                $scope.gridOptions.columnDefs = [
                    { name: 'id', enableCellEdit: false },
                    { name: 'age', enableCellEditOnFocus:false, displayName:'age (f2/dblClick edit)', width: 200  },
                    { name: 'address.city', enableCellEdit: true, width: 300 },
                    { name: 'name', displayName: 'Name (editOnFocus)', width: 200}
                ];
            }

            if(param){
                $http.jsonp(`${href}?callback=JSON_CALLBACK&param=${param}`)
                    .success(res => {
                        $scope.gridOptions.data = res.DBData;
                    })
            }else{
                $http.get(href)
                .success(res => {
                    $scope.gridOptions.data = res;
                })
            }


            // $http.get(href)
            //     .success(function(data) {
            //         $scope.gridOptions.data = data;
            //     });

            // $scope.gridOptions.onRegisterApi = function(gridApi){
            //     $scope.gridApi = gridApi;
            // };
        }
    })
}

