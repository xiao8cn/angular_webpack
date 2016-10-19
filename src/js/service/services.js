import ajaxService from "./common/ajaxService";

const servicesModule = angular.module("common",[])
    .service("ajaxService",ajaxService)

export default servicesModule;