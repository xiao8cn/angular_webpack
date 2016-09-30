export function buttonComponent(angular){
    angular.component("testComponent",{
        template : '<h1>123 {{$ctrl.message}}</h1>',
        controller : function(){
            this.message = "12445asd343"
        }
    })
}