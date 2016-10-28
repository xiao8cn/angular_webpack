import ajaxService from "./service/ajax.service";

/**
 * 公共服务，包含service,module,provider,factory
 */
const ServiceModule = angular.module("serviceCommon",[])
    .service("ajaxService",ajaxService);

export default ServiceModule;