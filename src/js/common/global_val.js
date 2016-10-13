
let CinterFaceUrl = "http://10.99.2.61:8083";

export const CommonComponentBox = {
    "CONTACT_CUST" : {
        href : `${CinterFaceUrl}/SCM/BusinessBase/Customer/getCustomer`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":"e7ba24d2-8806-46bf-831c-ca1e9e8620fb",
            "SessionTimeout":"60",
            "Version":"1.0",
            "DBRequest":{
                "Field":[
                    "ALLFIELDS"
                ],
                "Where":"CUSTOMER_STATUS like 9 ",
                "Page":{
                    "Start":"1",
                    "End":"10"
                }
            }
        },
        wheres : [
            {
                name_cn : "客户编码",
                name : "CUSTOMER_CODE",
            },
            {
                name_cn : "客户名称",
                name : "NAME_CN",
            }
        ],
        title : "往来户",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [5, 10, 20],
            paginationPageSize : 5,
            multiSelect : false,
            columnDefs : [
                { name: 'CUSTOMER_CODE', enableCellEdit: false,displayName:"客户编码" ,enableColumnMenu: false},
                { name: 'NAME_CN', enableCellEdit: false,displayName:"客户名称" ,enableColumnMenu: false},
                { name: 'PUR_ORG', enableCellEdit: false,displayName:"销售组织" ,enableColumnMenu: false},
                { name: 'IMPORTANCE_NAME', enableCellEdit: false,displayName:"客户等级" ,enableColumnMenu: false},
                { name: 'CONTACTS', enableCellEdit: false,displayName:"联系人" ,enableColumnMenu: false},
                { name: 'ADDRESS', enableCellEdit: false,displayName:"地址" ,enableColumnMenu: false},
            ],
        }
    },
    "PAY_CON_NAME" : {
        href : `${CinterFaceUrl}/SCM/BusinessBase/PaymentsCondition/getPaymentsCondition`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":"1591ac3e-c05b-4332-af47-525b5242d1aa",
            "SessionTimeout":"60",
            "Version":"1.0",
            "DBRequest":{
                "Field":[
                    "ALLFIELDS"
                ],
                "Where":"1=1 ",
                "Page":{
                    "Start":"1",
                    "End":"10"
                }
            }
        },
        wheres : [
            {
                name_cn : "编号",
                name : "PAY_CON_CODE",
            },
            {
                name_cn : "名称",
                name : "PAY_CON_NAME",
            }
        ],
        title : "付款条件",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [5, 10, 20],
            paginationPageSize : 5,
            multiSelect : false,
            columnDefs : [
                { name: 'PAY_CON_CODE', enableCellEdit: false,displayName:"编号" ,enableColumnMenu: false,width:100},
                { name: 'PAY_CON_NAME', enableCellEdit: false,displayName:"名称" ,enableColumnMenu: false,width:100},
                { name: 'USE', enableCellEdit: false,displayName:"用途" ,enableColumnMenu: false,width:100},
                { name: 'PRE_PAYMENT_RATIO', enableCellEdit: false,displayName:"预支付比例" ,enableColumnMenu: false,width:100},
                { name: 'SETTLE_METHOD', enableCellEdit: false,displayName:"结算方式" ,enableColumnMenu: false,width:100},
                { name: 'SINCE_THE_STANDARD', enableCellEdit: false,displayName:"起算标准" ,enableColumnMenu: false,width:100},
                { name: 'DELAYED_DAYS', enableCellEdit: false,displayName:"起算延期天数" ,enableColumnMenu: false,width:100},
                { name: 'MONTHS', enableCellEdit: false,displayName:"月数" ,enableColumnMenu: false,width:100},
                { name: 'DAYS', enableCellEdit: false,displayName:"日数" ,enableColumnMenu: false,width:100},
                { name: 'FIXED_DATE', enableCellEdit: false,displayName:"固定日期" ,enableColumnMenu: false,width:100},
                { name: 'DESCRIPTION', enableCellEdit: false,displayName:"描述" ,enableColumnMenu: false,width:100},
                { name: 'STATUS', enableCellEdit: false,displayName:"启用/禁用" ,enableColumnMenu: false,width:100},
            ],
        }
    },
    "INVOICE_ADDRESS1" :{
        href : `${CinterFaceUrl}/SCM/SystemBase/Address/getAddress`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":"1591ac3e-c05b-4332-af47-525b5242d1aa",
            "SessionTimeout":"60",
            "Version":"1.0",
            "DBRequest":{
                "Field":[
                    "ALLFIELDS"
                ],
                "Where":"1=1 ",
                "Page":{
                    "Start":"1",
                    "End":"10"
                }
            }
        },
        wheres : [
            {
                name_cn : "国家(IOS)",
                name : "COUNTRY",
            },
            {
                name_cn : "省(直辖市)",
                name : "PROVINCE",
            },
            {
                name_cn:"邮编code",
                name : "POST_CODE"
            }
        ],
        title : "付款条件",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [5, 10, 20],
            paginationPageSize : 5,
            multiSelect : false,
            columnDefs : [
                { name: 'COUNTRY', enableCellEdit: false,displayName:"国家(IOS)" ,enableColumnMenu: false,width:100},
                { name: 'PROVINCE', enableCellEdit: false,displayName:"省(直辖市)" ,enableColumnMenu: false,width:100},
                { name: 'CITY', enableCellEdit: false,displayName:"城市" ,enableColumnMenu: false,width:100},
                { name: 'ZONE', enableCellEdit: false,displayName:"区" ,enableColumnMenu: false,width:100},
                { name: 'POST_CODE', enableCellEdit: false,displayName:"邮编" ,enableColumnMenu: false,width:100},
                { name: 'ADDRESS1', enableCellEdit: false,displayName:"地址1" ,enableColumnMenu: false,width:100},
                { name: 'ADDRESS_MARK', enableCellEdit: false,displayName:"地标" ,enableColumnMenu: false,width:100},
                { name: 'BUSINESS_ZONE', enableCellEdit: false,displayName:"商圈" ,enableColumnMenu: false,width:100},
                { name: 'LATITUDE', enableCellEdit: false,displayName:"经度" ,enableColumnMenu: false,width:100},
                { name: 'LONGITUDE', enableCellEdit: false,displayName:"纬度" ,enableColumnMenu: false,width:100},
                { name: 'ADDRESS2', enableCellEdit: false,displayName:"地址2" ,enableColumnMenu: false,width:100},
            ],
        }
    }
};
