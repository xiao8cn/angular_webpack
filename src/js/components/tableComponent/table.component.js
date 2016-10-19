import template from "./table.html";

const tableComponent = {
    template : template,
    bindings : {
        option : "<"
    },
    controller : function ($scope,$http,$log,$timeout,i18nService,$uibModal,scmAjaxService) {

        let ctrl = this,
            option = ctrl.option || {},
            href = option.href,
            lang = option.lang || "en",
            gridOption = option.gridOption,
            param = option.param;

        /**
         * 生命周期的加载
         */
        this.$onInit = ()=>{
            i18nService.setCurrentLang(lang);
            this.refreshTable(1,gridOption.paginationPageSize,href,param);
        }

        this.title = option.title;

        /**
         * 新增 function
         */
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
                console.log(selectedItem);
                if(selectedItem === "success"){
                    ctrl.refreshTable(1,gridOption.paginationPageSize,href,param);
                }
            }, function ($scope) {
                console.log($scope);
            });
        }

        /**
         * 修改 function
         */
        this.delete = function(){
            if(ctrl.selectRows.length>=0){
                let delGids = "";
                delGids += "(";
                ctrl.selectRows.forEach(row=>{
                    let delIndex;
                    $scope.gridOptions.data.forEach((res,index)=>{
                        if(res.GID === row.entity.GID){
                            delIndex = index;
                            console.log(index);
                            delGids += `${res.GID},`
                        }
                    })
                    if(delIndex === 0 || delIndex){
                        $scope.gridOptions.data.splice(delIndex,1);
                    }
                })

                delGids = delGids.slice(0,-1);
                delGids +=")";

                let delHref = "http://10.99.2.61:8083/SCM/CRM/CUSTOMER/delCustomer",
                    delparam = {
                     "RequestID":"9999",
                     "RequestFormat":"JSON",
                     "SessionKey":"c66b24c3-a692-4916-a668-254eab8e3306",
                     "SessionTimeout":"60",
                     "Version":"1.0",
                     "DBRequest":{
                        "Where":`GID in ${delGids}`
                     }
                 }

                 console.log(delparam);

                scmAjaxService.getAjaxJsonp(delHref,delparam)
                 .then(res=>{
                     console.log(res);
                     ctrl.refreshTable(1,gridOption.paginationPageSize,href,param);
                 })
            }else{
                
            }
        }

        this.search = function(){
            let swhere = "";
            if($scope.searchSelectValue1){
                swhere += ` 1=1 and ${ctrl.searchSelectType1.id} like ${$scope.searchSelectValue1} order by GID desc`;
                param.DBRequest.Where = swhere;
                console.log(swhere);
                $scope.gridOptions.data = [];
                this.refreshTable(1,gridOption.paginationPageSize,href,param);
            }else{
                param.DBRequest.Where = " 1=1 order by GID desc";
                $scope.gridOptions.data = [];
                this.refreshTable(1,gridOption.paginationPageSize,href,param);
            }
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


        ctrl.selectRows = [];

        /**
         * grid API 事件
         * @param gridApi
         */
        $scope.gridOptions.onRegisterApi = function(gridApi){
            /**
             * select 选择事件
             */
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                if(row.isSelected){
                    ctrl.selectRows.push(row);
                }else{
                    if(ctrl.selectRows.indexOf(row) !== -1){
                        ctrl.selectRows.splice(ctrl.selectRows.indexOf(row),1);
                    }
                }
            });

            /**
             * 分页click事件
             */
            gridApi.pagination.on.paginationChanged($scope,function(newPage, pageSize) {
                ctrl.refreshTable(newPage,gridOption.paginationPageSize,href,param);
            });

        };

        /**
         * 页面加载数据
         * @param newPage 当前页面
         * @param pageSize 显示行数
         * @param href      路径
         * @param param     请求参数
         */
        ctrl.refreshTable = function(newPage,pageSize,href,param){
            if(param){
                param.DBRequest.Page.Start = newPage*gridOption.paginationPageSize+1-gridOption.paginationPageSize + "";
                param.DBRequest.Page.End = newPage*gridOption.paginationPageSize+"";
                scmAjaxService.getAjaxJsonp(href,param)
                    .then(res=>{
                        if(res.DBData){
                            $timeout(()=>{
                                $scope.gridOptions.paginationCurrentPage = newPage;
                                $scope.gridOptions.totalItems = res.DBCount;
                                $scope.gridOptions.data = res.DBData;
                            },100)
                        }else{
                            $scope.$apply(()=>{
                                $scope.gridOptions.paginationCurrentPage = 1;
                                $scope.gridOptions.data = [];
                            })
                        }

                    })
            }else{
                $http.get(href)
                    .success(res => {
                        $scope.gridOptions.paginationCurrentPage = newPage;
                        $scope.gridOptions.totalItems = res.DBCount;
                        $scope.gridOptions.data = res;
                    })
            }
        }

        ctrl.selectType1 = [
            {
                "id":"CUSTOMER_CODE",
                "text":"客户编码",
                "selected":true
            },{
                "id":"NAME_CN",
                "text":"客户名称"
            }
        ]
        ctrl.searchSelectType1 = ctrl.selectType1[0];

    }
}

export default tableComponent;