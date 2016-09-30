require("angular");

import { buttonComponent } from "../component/button.component";

let scm_web = angular.module("scm",[]);

buttonComponent(scm_web);

scm_web.component("scmComponent",{
    template : '<h1>123 {{$ctrl.message}}</h1><test-component></test-component>',
    controller : function(){
        this.message = "12445343"
    }
});

