added by zsl
组件自动读取route对象，根据路径配置对象中自定义属性title和parents构造面包屑
路径配置示例：

'info/app/detail/:appId': {
    component: (resolve) => {
        require(['components/app/detail/detail'], resolve);
    },
    title: '应用详情',
    parents: [{
        url: '/info',
        title: '全局统计管理'
    },{
        url: '/info/app',
        title: '全部应用'
    }]
}