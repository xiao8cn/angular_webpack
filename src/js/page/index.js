require("angular");

import { buttonComponent } from "../component/button.component";
import { tableComponent } from "../component/table.component";

let scm_web = angular.module("scm",[]);

buttonComponent(scm_web);
tableComponent(scm_web);

scm_web.component("scmComponent",{
    template : `<h1>123 {{$ctrl.message}}</h1>
                <table-component></table-component>`,
    controller : function(){
        this.message = "12445343"
    }
});

