import treeModule from "./treeComponent/treeModule";
import tableModule from "./tableComponent/tableModule";
import customerInformationManagerAddModule from "./CRM/customerInformationManager/customerInformationManagerAddModule";
import commonBoxModule from "./commomBoxComponent/commonBoxModule";
import headModule from "./headComponent/headModule";

const ComponentsModule = angular.module("components",[
    treeModule.name,
    tableModule.name,
    customerInformationManagerAddModule.name,
    commonBoxModule.name,
    headModule.name
])

export default  ComponentsModule;