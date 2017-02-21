<template>
    <div :id="treeId" class="ztree">
    </div>
</template>
<script type="text/ecmascript-6">
    var index = 0
    var defaultSetting = {
        async: {
            enable: false,
            contentType: 'application/json',
            type: 'post',
            dataType: 'json'
        },

        data: {
            key: {
                name: 'label'
            }
        },

        callback: {}
    };

    /**
     * ztree
     * @module ztree
     * @example
     *     <caption>html</caption>
     *     <ztree :extra-setting='setting' @on-click="click" @on-expand="expand"></ztree>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         setting: function() {
     *             return {
     *                  url: '/yxxzry/postManage/getStructureTree',
     *                  dataFilter: function (res) {
     *                      return res.data.datas.rows
     *                  },
     *                  params: {"keyword": "", "grade": "-1", "level": '-1', "parentId": "-1"}
     *             }
     *         },
     *
     *         methods:{
     *              click(){
     *
     *              }
     *         }
     *         components: {ztree}
     *     }
     */
    export default {

        /**
         * @property {Object} setting 参考 http://www.treejs.cn/v3/api.php
         * @property {String} extraSetting.url 获取节点数据的接口
         * @property {Function} extraSetting.dataFilter 对接口返回数据的处理函数
         * @property {Object} extraSetting.params 调用接口时传的参数
         * @property {Object} data 非懒加载使用的数据
         */
        props: {
            // ztree 原生配置 参考 http://www.treejs.cn/v3/api.php
            setting:{
                type:Object,
                default:function () {
                    return {}
                }
            },
            /**
             * options.url [String] 获取节点数据的接口
             * options.dataFilter [Function] 对接口返回数据对处理函数
             * options.params [Object] 调用接口时的参数
             */
            extraSetting: {
                type: Object,
                default: function () {
                    return {}
                }
            },

            // 非懒加载
            data: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },

        data: function () {
            return {
                treeId: 'ztree-' + index++,
                currentSelectedNodeId: ''
            }
        },

        created(){
            var event = ['onDblClick', 'onMouseDown', 'onCheck', 'onCollapse',
                'onDblClick', 'onCollapse', 'onDrag', 'onDragMove', 'onDrop', 'onMouseUp', 'onNodeCreated', 'onRemove',
                'onRename', 'onRightClick', 'onClick', 'onExpand', 'onAsyncError', 'onAsyncSuccess']

            _.each(event, (item) => {
                defaultSetting.callback[item] = this._treeEvent(item)
            })

            // 如果不是使用ztree自带的async做懒加载
            if(this.extraSetting.url){
                defaultSetting.callback.onExpand = this._onExpand
                defaultSetting.callback.onClick = this._onClick
            }
        },

        ready(){
            var setting = $.extend({}, defaultSetting, this.setting)
            this._setting = setting
            if (this.data.length > 0) {
                $.fn.zTree.init($(this.$el), setting, this.data)
            } else if (this.extraSetting.url) {
                $.fn.zTree.init($(this.$el), setting)
                this._load(null, true)
            }
        },

        watch:{
            'data':function(newVal){
                $.fn.zTree.init($(this.$el), this._setting, newVal)
            }
        },

        methods: {
            _load(treeNode, inited){
                $.ajax({
                    type: this._setting.async.type,
                    contentType: this._setting.async.contentType,
                    url: this.extraSetting.url,
                    data: this.extraSetting.params
                }).done((res) => {
                    var treeNodes = []
                    if (this.extraSetting.dataFilter) {
                        treeNodes = this.extraSetting.dataFilter(res)
                    }

                    var treeObj = $.fn.zTree.getZTreeObj(this.treeId);
                    treeObj.addNodes(treeNode, treeNodes);

                    if (inited) {
                        Vue.nextTick(() => {
                            this.$emit('inited', treeNodes)
                        })
                    }
                })
            },

            _onExpand(event, treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj(this.treeId);

                this.$emit('on-expand', treeNode, event, treeId)

                if (this.extraSetting.url) {
                    if(treeNode._loaded){
                        return
                    }
                    treeNode._loaded = true

                    Vue.nextTick(()=> {
                        this._load(treeNode)
                    })
                }
            },

            _onClick(event, treeId, treeNode){
                // 已选中节点避免重复选中
                if (treeNode.tId != this.currentSelectedNodeId) {
                    this.$emit('on-click', treeNode, event, treeId)
                    this.currentSelectedNodeId = treeNode.tId
                }
            },

            /**
             * @method action
             * @description 调用ztree的原生方法 (能调用的方法参考：http://www.treejs.cn/v3/api.php)
             * @param actionName - 需要调用的原生ztree方法名称
             * @param ...args - 调用方法时传入的参数
             */
            action(actionName, ...args){
                var treeObj = $.fn.zTree.getZTreeObj(this.treeId);
                return treeObj[actionName](...args);
            },

            _treeEvent(eventName){
                return (...args) => {
                    this.$emit(Vue.util.hyphenate(eventName), ...args)
                }
            }
        }
    }
</script>
<style>

</style>
