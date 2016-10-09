
let treeHtml = require("../../html/Tree/tree_component.html");

export function treeComponent(angular) {
    //然后 DataTables 这样初始化：
    angular.component("treeComponent", {
        template : treeHtml,
        bindings : {
        },
        controller: function() {

        }
    })
}

