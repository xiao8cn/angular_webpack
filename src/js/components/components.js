import treeModule from "./treeComponent/treeModule";
import tableModule from "./tableComponent/tableModule";
import customerInformationManagerAddModule from "./CRM/customerInformationManager/customerInformationManagerAddModule";
import commonBoxModule from "./commomBoxComponent/commonBoxModule";

const ComponentsModule = angular.module("components",[
    treeModule.name,
    tableModule.name,
    customerInformationManagerAddModule.name,
    commonBoxModule.name
])

export default  ComponentsModule;