import template from "./table.html";

const tableComponent = {
    template : template,
    bindings : {
        option : "<"
    },
    controller : function ($scope,$http,$log,i18nService,$uibModal) {

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
            console.log(param);
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
}

export default tableComponent;