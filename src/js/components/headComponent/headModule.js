import headComponent from "./head.component.js";

const headModule = angular.module("scmHead",[])
    .component("scmHead",headComponent);

export default headModule;