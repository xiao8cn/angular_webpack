import tableComponent from "./table.component";

const tableModule = angular.module("scmTable",[
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.selection',
    'ui.grid.cellNav',
    'ui.grid.pagination',
])
    .component("scmTable",tableComponent);

export default  tableModule;