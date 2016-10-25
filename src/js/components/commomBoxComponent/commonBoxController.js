class commonBoxController {

    /**
     * 构造函数
     * @param $scope
     * @param $http
     * @param i18nService
     * @param ajaxService
     */
    constructor($scope,$http,i18nService,ajaxService){
        this.$scope = $scope;
        this.$http = $http;
        this.i18nService = i18nService;
        this.ajaxService = ajaxService;
    }

    /**
     * init 参数初始化
     */
    $onInit(){
        console.log("init");

        this.option = this.resolve.option || {};
        this.select = {};
        this.textdata = {};

        let option = this.option,
            lang = option.lang || "zh-cn",
            gridOption = option.gridOptions || {},
            href = option.href,
            param = option.param;

        this.param = option.param;
        this.href = option.href;
        this.ctrl = this;

        this.i18nService.setCurrentLang(lang);

        this.title = option.title || "TEST";
        this.wheres = option.wheres || {};
        this.selectRow = {};
        this.gridOptions = gridOption;
        this.gridOptions.enableCellEditOnFocus = gridOption.enableCellEditOnFocus || true;
        this.gridOptions.enableGridMenu = gridOption.enableGridMenu || true;
        this.gridOptions.paginationPageSizes = gridOption.paginationPageSizes || [5, 10, 20];
        this.gridOptions.paginationPageSize = gridOption.paginationPageSize || 5;
        this.gridOptions.multiSelect = gridOption.multiSelect || false;
        this.gridOptions.enableSelectAll = gridOption.enableSelectAll || false;
        this.gridOptions.columnDefs = gridOption.columnDefs || [];
        this.gridOptions.onRegisterApi = this.onRegisterApi;

        this.$scope.gridOptions = this.gridOptions;

        /**
         * ajax 数据加载
         */
        this.ajaxService.getAjaxJsonp(href,param)
            .success(res=>{
                this.$scope.gridOptions.data = res.DBData;
            })
    }

    onRegisterApi(gridApi){
        gridApi.selection.on.rowSelectionChanged(this.$scope,function(row){
            if(row.isSelected){
                this.selectRow = row;
            }else{
                this.selectRow = {};
            }
        });
    };

    search(){
        let data = {},
            oldWhere = this.param.DBRequest.Where;

        for(let key in this.textdata){
            data[key] = this.textdata[key];
        }
        for(let key in this.select){
            if(this.select[key]){
                data[key] = this.select[key].id;
            }
        }

        this.ajaxService.searchCommonBox(data,this.href,this.param)
            .success(res=>{
                this.gridOptions.data = res.DBData;
                this.param.DBRequest.Where = oldWhere;
            })
    };

    save(){
        this.close({$value: this.selectRow});
    }

    cancel(){
        this.dismiss({$value: 'cancel'});
    }

}

export default commonBoxController;