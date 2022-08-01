两个插件
 1 wasm-loader

 2 sql.js


config.module
      .rule('wasm')
      .type("javascript/auto")
      .test(/.wasm$/)
      .use('wasm-loader')
      .loader('wasm-loader')

单个/多个
新建视图的数据格式
 [guid]: {  
  isPolymeriZation:true or false,//是聚合视图还是单个视图,
  hw-aggregatedview-manifest:{
    "version":1,
    "viewType":"2d/3d",
    "views":[
        {
            "modelId":"",
            "modelId4Revit":"",
            "modelName":"",
            "publicVersion":1,
            "3d":[
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"xx项目-3d视图//id不可靠前段直接那类型区分",
                    "transform":{

                    }
                }
            ],
            "2d":[
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"二维视图",
                    "transform":{

                    }
                },
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"二维视图1",
                    "transform":{

                    }
                }
            ],
            "drawing":[
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"图纸x",
                    "transform":{

                    }
                },
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"图纸x",
                    "transform":{

                    }
                }
            ],
            "schedule":[
                {
                    "viewableID":"********-****-****-****-************-********//跨版本统计表的 id不一样",
                    "name":"明细表x//跨版本使用名称判断",
                    "transform":{

                    }
                }
            ]
        },
        {
            "modelId":"",
            "modelId4Revit":"",
            "modelName":"",
            "publicVersion":1,
            "3d":[
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"xx项目-3d视图//id不可靠前段直接那类型区分",
                    "transform":{

                    }
                }
            ],
            "2d":[
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"二维视图",
                    "transform":{

                    }
                },
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"二维视图1",
                    "transform":{

                    }
                }
            ],
            "drawing":[
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"图纸x",
                    "transform":{

                    }
                },
                {
                    "viewableID":"********-****-****-****-************-********",
                    "name":"图纸x",
                    "transform":{

                    }
                }
            ],
            "schedule":[
                {
                    "viewableID":"********-****-****-****-************-********//跨版本统计表的 id不一样",
                    "name":"明细表x//跨版本使用名称判断",
                    "transform":{

                    }
                }
            ]
        }
    ]
}
}


//点击聚合的
