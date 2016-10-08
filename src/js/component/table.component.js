require("jquery");

export function tableComponent(angular){
    //然后 DataTables 这样初始化：
    angular.component("tableComponent",{
        template : `<table id="example" class="table table-striped table-bordered">
                        <thead> 
                         <tr> 
                          <th>序号</th> 
                          <th>标题</th> 
                          <th>连接</th> 
                         </tr> 
                        </thead> 
                    </table>`,
        controller : ()=>{
            
        }
    })
}