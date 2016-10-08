export function tableComponent(angular) {
    //然后 DataTables 这样初始化：
    angular.component("tableComponent", {
        template: `<div ui-grid="gridOptions" ui-grid-edit ui-grid-cellnav class="grid"></div>`,
        controller: function ($scope,$http) {
            $scope.gridOptions = {  };
            $scope.gridOptions.enableCellEditOnFocus = true;

            $scope.gridOptions.columnDefs = [
                { name: 'id', enableCellEdit: false },
                { name: 'age', enableCellEditOnFocus:false, displayName:'age (f2/dblClick edit)', width: 200  },
                { name: 'address.city', enableCellEdit: true, width: 300 },
                { name: 'name', displayName: 'Name (editOnFocus)', width: 200}
            ];

            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
                .success(function(data) {
                    $scope.gridOptions.data = data;
                });

            $scope.currentFocused = "";

            $scope.getCurrentFocus = function(){
                var rowCol = $scope.gridApi.cellNav.getFocusedCell();
                if(rowCol !== null) {
                    $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.name;
                }
            }

            $scope.gridOptions.onRegisterApi = function(gridApi){
                $scope.gridApi = gridApi;
            };
        }
    })
}

