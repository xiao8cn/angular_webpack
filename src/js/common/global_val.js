
let CinterFaceUrl = "http://10.99.2.61:8083",
    sessionKey = "bee07180-a4cb-4c34-9191-436eca665608";

export const CommonComponentBox = {
    "CONTACT_CUST" : {
        href : `${CinterFaceUrl}/SCM/BusinessBase/Customer/getCustomer`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":sessionKey,
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
                type:"text",
            },
            {
                name_cn : "客户名称",
                name : "NAME_CN",
                type:"text",
            }
        ],
        title : "往来户",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [10, 20, 30],
            paginationPageSize : 5,
            multiSelect : false,
            enableSelectAll : false,
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
            "SessionKey":sessionKey,
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
                type:"text",
            },
            {
                name_cn : "名称",
                name : "PAY_CON_NAME",
                type:"text",
            }
        ],
        title : "付款条件",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [10, 20, 30],
            paginationPageSize : 10,
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
            "SessionKey":sessionKey,
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
                type:"text",
            },
            {
                name_cn : "省(直辖市)",
                name : "PROVINCE",
                type:"text",
            },
            {
                name_cn : "城市",
                name : "CITY",
                type:"text",
            },
            {
                name_cn : "区",
                name : "ZONE",
                type:"text",
            },
            {
                name_cn:"邮编",
                name : "POST_CODE",
                type:"text",
            },
            {
                name_cn:"地址1",
                name : "ADDRESS1",
                type:"text",
            },
            {
                name_cn:"地标",
                name : "ADDRESS_MARK",
                type:"text",
            },
            {
                name_cn:"商圈",
                name : "BUSINESS_ZONE",
                type:"text",
            }
        ],
        title : "发票地址",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [10, 20, 30],
            paginationPageSize : 10,
            multiSelect : false,
            enableSelectAll : false,
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
    },
    "SEND_ADDRESS1" :{
        href : `${CinterFaceUrl}/SCM/SystemBase/Address/getAddress`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":sessionKey,
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
                type:"text",
                /*type : "select",
                selectValue : [
                    {
                        id:1,
                        text:"123"
                    },
                    {
                        id:2,
                        text:"123"
                    },
                ]*/
            },
            {
                name_cn : "省(直辖市)",
                name : "PROVINCE",
                type : "text",
            },
            {
                name_cn : "城市",
                name : "CITY",
                type : "text",
            },
            {
                name_cn : "区",
                name : "ZONE",
                type : "text",
            },
            {
                name_cn:"邮编",
                name : "POST_CODE",
                type : "text",
            },
            {
                name_cn:"地址1",
                name : "ADDRESS1",
                type : "text",
            },
            {
                name_cn:"地标",
                name : "ADDRESS_MARK",
                type : "text",
            },
            {
                name_cn:"商圈",
                name : "BUSINESS_ZONE",
                type : "text",
            }
        ],
        title : "送货地址",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [10, 20, 30],
            paginationPageSize : 10,
            multiSelect : false,
            enableSelectAll : false,
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
    },
    "PUR_ORG" :{
        href : `${CinterFaceUrl}/SCM/BusinessBase/IterParentOrg/getIterParentOrgView`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":sessionKey,
            "SessionTimeout":"60",
            "Version":"1.0",
            "DBRequest":{
                "Field":[
                    "ALLFIELDS"
                ],
                "Where":" 1=1 and IS_SALES_ORG=1",
                "Page":{
                    "Start":"1",
                    "End":"10"
                }
            }
        },
        wheres : [
            {
                name_cn: "组织编码",
                name: "ORG_CODE",
                type: "text",
            },
            {
                name_cn: "组织名称",
                name: "ORG_NAME",
                type: "text",
            },
            {
                name_cn: "上级机构",
                name: "PARENT_ORG_NAME",
                type: "text",
            },
            {
                name_cn: "层级",
                name: "LEVEL_NAME",
                type: "select",
                selectValue:[
                    {
                        "id": "1",
                        "text": "集团",
                    }, {
                        "id": "2",
                        "text": "公司",
                    }, {
                        "id": "3",
                        "text": "部门",
                    }, {
                        "id": "4",
                        "text": "办事处",
                    }
                ]
            },
            {
                name_cn: "销售组织",
                name: "IS_SALES_ORG_NAME",
                type: "select",
                selectValue:[
                    {
                        "id": "1",
                        "text": "是",
                    }, {
                        "id": "2",
                        "text": "否",
                    }
                ]
            },
            {
                name_cn: "采购组织",
                name: "IS_INVENTORY_ORG_NAME",
                type: "select",
                selectValue:[
                    {
                        "id": "1",
                        "text": "是",
                    }, {
                        "id": "2",
                        "text": "否",
                    }
                ]
            },
            {
                name_cn: "库存组织",
                name: "IS_INVENTORY_ORG_NAME",
                type: "select",
                selectValue:[
                    {
                        "id": "1",
                        "text": "是",
                    }, {
                        "id": "2",
                        "text": "否",
                    }
                ]
            },
            {
                name_cn: "财务组织",
                name: "IS_FINANCE_ORG_NAME",
                type: "select",
                selectValue:[
                    {
                        "id": "1",
                        "text": "是",
                    }, {
                        "id": "2",
                        "text": "否",
                    }
                ]
            }
        ],
        title : "销售组织",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [5, 10, 20],
            paginationPageSize : 5,
            multiSelect : false,
            enableSelectAll : false,
            columnDefs : [
                { name: 'ORG_CODE', enableCellEdit: false,displayName:"组织编码" ,enableColumnMenu: false,width:100},
                { name: 'ORG_NAME', enableCellEdit: false,displayName:"组织名称" ,enableColumnMenu: false,width:100},
                { name: 'PARENT_ORG_NAME', enableCellEdit: false,displayName:"上级机构" ,enableColumnMenu: false,width:100},
                { name: 'LEVEL_NAME', enableCellEdit: false,displayName:"层级" ,enableColumnMenu: false,width:100},
                { name: 'STATUS_NAME', enableCellEdit: false,displayName:"启用" ,enableColumnMenu: false,width:100},
                { name: 'IS_SALES_ORG_NAME', enableCellEdit: false,displayName:"销售组织" ,enableColumnMenu: false,width:100},
                { name: 'IS_PURCHASE_ORG_NAME', enableCellEdit: false,displayName:"采购组织" ,enableColumnMenu: false,width:100},
                { name: 'IS_INVENTORY_ORG_NAME', enableCellEdit: false,displayName:"库存组织" ,enableColumnMenu: false,width:100},
                { name: 'IS_FINANCE_ORG_NAME', enableCellEdit: false,displayName:"财务组织" ,enableColumnMenu: false,width:100},
                { name: 'SIMPLE_NAME', enableCellEdit: false,displayName:"组织简称" ,enableColumnMenu: false,width:100},
                { name: 'FULL_NAME', enableCellEdit: false,displayName:"组织全称" ,enableColumnMenu: false,width:100},
                { name: 'ENG_NAME', enableCellEdit: false,displayName:"英文名称" ,enableColumnMenu: false,width:100},
            ],
        }
    },
    "PUR_MAN" : {
        href : `${CinterFaceUrl}/SCM/BusinessBase/ItersalesPersonView/getItersalesPersonView`,
        param : {
            "RequestID":"9999",
            "RequestFormat":"JSON",
            "SessionKey":sessionKey,
            "SessionTimeout":"60",
            "Version":"1.0",
            "DBRequest":{
                "Field":[
                    "ALLFIELDS"
                ],
                "Where":" 1=1 ",
                "Page":{
                    "Start":"1",
                    "End":"10"
                }
            }
        },
        wheres : [
            {
                name_cn : "员工编号",
                name : "EMPLOYEE_CODE",
                type:"text",
            },
            {
                name_cn : "员工中文姓名",
                name : "NAME_CN",
                type:"text",
            },
            {
                name_cn : "员工英文姓名",
                name : "NAME_EN",
                type:"text",
            },
            {
                name_cn : "所属部门",
                name : "ORG_NAME",
                type:"text",
            }
        ],
        title : "销售人员",
        lang : "zh-cn",
        gridOptions:{
            enableCellEditOnFocus : true,
            enableGridMenu : true,
            paginationPageSizes : [5, 10, 20],
            paginationPageSize : 5,
            multiSelect : false,
            enableSelectAll : false,
            columnDefs : [
                { name: 'EMPLOYEE_CODE', enableCellEdit: false,displayName:"员工编号" ,enableColumnMenu: false},
                { name: 'NAME_CN', enableCellEdit: false,displayName:"员工中文姓名" ,enableColumnMenu: false},
                { name: 'NAME_EN', enableCellEdit: false,displayName:"员工英文姓名" ,enableColumnMenu: false},
                { name: 'ORG_NAME', enableCellEdit: false,displayName:"所属部门" ,enableColumnMenu: false},
            ],
        }
    },
};
