import ajaxService from "./service/ajax.service";

/**
 * 公共服务，包含service,module,provider,factory
 */
const CommonModule = angular.module("common",[])
    .service("ajaxService",ajaxService);

export default CommonModule;