import treeComponent from "./tree.component";

const treeModule = angular.module("scmTree",[])
    .component("scmTree",treeComponent);

export default treeModule;
