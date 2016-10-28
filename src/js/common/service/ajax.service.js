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

    getAjaxPost(href,param){
        if(typeof param === "object") {
            param = JSON.stringify(param);
        }
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:"post",
                data : {param:param},
                dataType : 'json',
                url : href,
                success : res=>resolve(res),
                error : res=>reject(res)
            })
        })
    }

    searchCommonBox(val,href,param) {
        let where = param.DBRequest.Where;

        for (let key in val){
            if(val[key]){
                where +=` and ${key} like ${val[key]}`;
            }
        }
        param.DBRequest.Where = where;
        return this.getAjaxPost(href,param)
    }
}

export default ajaxService;