export function tableComponent(angular) {
    //然后 DataTables 这样初始化：
    angular.component("tableComponent", {
        template : `<div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">{{$ctrl.title}}</h3>
                          </div>
                        <div class="panel-body">
                            <div ui-grid="gridOptions" ui-grid-edit ui-grid-cellnav class="grid"></div>
                        </div>  
                    </div>`,
        bindings : {
            option : "<"
        },
        controller: function ($scope,$http,tableService) {

            let ctrl = this,
                option = ctrl.option || {},
                href = option.href,
                gridOption = option.gridOption,
                param = JSON.stringify(option.param);

            this.title = option.title;

            $scope.gridOptions = gridOption;
            $scope.gridOptions.enableCellEditOnFocus = true;

            tableService.jsonpData(href);

            $http.jsonp(`${href}?callback=JSON_CALLBACK&param=${param}`)
                .success(res => {
                    console.log(res);
                    $scope.gridOptions.data = res.DBData;
                })


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

