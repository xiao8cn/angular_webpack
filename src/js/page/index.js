require("angular");

let scm_web = angular.module("scm",[]);

scm_web.component("scmComponent",{
    template : '<h1>123 {{$ctrl.message}}{{$ctrl.message}}</h1>',
    controller : function(){
        this.message = "12445asd343"
    }
});

