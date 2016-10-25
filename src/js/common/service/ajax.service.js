class ajaxService {
    constructor($http){
        this.$http = $http;
    };

    getAjaxJsonp(href,param) {
        if(typeof param === "object") {
            param = JSON.stringify(param);
        }
        return this.$http.jsonp(`${href}?callback=JSON_CALLBACK&param=${param}`);
    };

    searchCommonBox(val,href,param) {
        let where = param.DBRequest.Where;

        for (let key in val){
            if(val[key]){
                where +=` and ${key} like ${val[key]}`;
            }
        }
        param.DBRequest.Where = where;
        return this.getAjaxJsonp(href,param)
    }
}

export default ajaxService;