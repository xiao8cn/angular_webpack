import ajaxService from "./common/ajaxService";

const servicesModule = angular.module("common",[])
    .service("scmAjaxService",ajaxService);

export default servicesModule;