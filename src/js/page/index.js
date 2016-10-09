require("angular");
require("angular-ui-grid");
require("angular-ui-router");
require("bootstrap");

let scmIndexHtml = require("../../html/scmIndex.html");

import { tableComponent } from "../component/table.component";
import { treeComponent } from "../component/tree.component";

let scm_web = angular.module("scm",['ui.grid', 'ui.grid.edit', 'ui.grid.cellNav','ui.router']);

scm_web.config(function($stateProvider) {
    var states = [{
        name: 'hello',
        url: '/hello',
        component : 'tableComponent',
        resolve: {
            source : function(){
                return "https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json";
            }
        }
    },{
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    }]

    states.forEach(function(state) {
        $stateProvider.state(state);
    });

});

treeComponent(scm_web);
tableComponent(scm_web);

scm_web.component("scmComponent",{
    template : scmIndexHtml,
    styles: [],
    controller : function($scope){

        $scope.source = "https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json";

        this.message = "12445343"

    }
});


