let treeHtml = require("../../html/Tree/tree_component.html");

export function treeComponent() {
    //然后 DataTables 这样初始化：
    angular.module("scm").component("treeComponent", {
        template : treeHtml,
        bindings : {
        },
        controller: function() {

        }
    })
}

