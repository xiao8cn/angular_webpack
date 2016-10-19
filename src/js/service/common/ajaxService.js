class ajaxService {
    constructor($http,$scope){
        this.$http = $http;
        this.$scope = $scope;
    };

    getAjaxJsonp(href,param) {
        return new Promise((resolve,reject) => {
            param = JSON.stringify(param);
            $http.jsonp(`${href}?callback=JSON_CALLBACK&param=${param}`)
                .success(res => {
                    resolve(res.DBData);
                })
                .error((res,status)=>{
                    reject(res,status)
                })
        });
    };
    searchCommonBox(val,href,param,$scope) {
        let oldWhere = param.DBRequest.Where,
            where = oldWhere;

        for (let key in val){
            if(val[key]){
                where +=` and ${key} like ${val[key]}`;
            }
        }
        param.DBRequest.Where = where;
        this.getAjaxJsonp(href,param)
            .then(res=>{
                $scope.$apply(function () {
                    $scope.gridOptions.data = res || [];
                    param.DBRequest.Where = oldWhere;
                });
            })
    }
}

export default ajaxService;