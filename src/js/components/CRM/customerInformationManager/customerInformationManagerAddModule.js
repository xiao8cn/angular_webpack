import customerInformationManagerAddComponent from "./customerInformationManagerAddComponent";

const customerInformationManagerAddModule = angular.module("customerAddComponent",[])
    .component("customerAddComponent",customerInformationManagerAddComponent);

export default customerInformationManagerAddModule;