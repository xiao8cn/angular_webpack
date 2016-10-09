export function tableComponent(angular) {
    //然后 DataTables 这样初始化：
    angular.component("tableComponent", {
        template : `<div ui-grid="gridOptions" ui-grid-edit ui-grid-cellnav class="grid"></div>`,
        bindings : {
            source : "<"
        },
        controller: function ($scope,$http) {

            let ctrl = this,
                href = ctrl.source;

            $scope.gridOptions = {};
            $scope.gridOptions.enableCellEditOnFocus = true;

            $scope.gridOptions.columnDefs = [
                { name: 'id', enableCellEdit: false },
                { name: 'age', enableCellEditOnFocus:false, displayName:'age (f2/dblClick edit)', width: 200  },
                { name: 'address.city', enableCellEdit: true, width: 300 },
                { name: 'name', displayName: 'Name (editOnFocus)', width: 200}
            ];

            $http.get(href)
                .success(function(data) {
                    $scope.gridOptions.data = data;
                });

            $scope.gridOptions.onRegisterApi = function(gridApi){
                $scope.gridApi = gridApi;
            };
        }
    })
}

