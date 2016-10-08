require("angular");

require("angular-ui-grid");

let scmIndexHtml = require("../../html/scmIndex.html");

import { buttonComponent } from "../component/button.component";
import { tableComponent } from "../component/table.component";

let scm_web = angular.module("scm",[require("angular-ui-layout"), 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav']);

buttonComponent(scm_web);
tableComponent(scm_web);

scm_web.component("scmComponent",{
    template : scmIndexHtml,
    styles: [],
    controller : function(){
        this.message = "12445343"
    }
});

