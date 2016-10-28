import propsFilter from "./filter/props.filter";

/**
 * 公共服务，包含service,module,provider,factory
 */
const FilterModule = angular.module("filterCommon",[])
    .filter("propsFilter",()=>propsFilter);

export default FilterModule;