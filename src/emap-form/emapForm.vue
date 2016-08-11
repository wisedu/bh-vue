<template>
    <div></div>
</template>

<script>
    /**
     * Form控件
     * @module EmapForm
     * @example
     *     // meta文件中支持的类型定义
     *     text
     *     textarea
     *     selecttable
     *     select
     *     multi-select2
     *     tree
     *     multi-tree
     *     date-local
     *     date-ym
     *     date-full
     *     switcher
     *     uploadfile
     *     uploadphoto
     *     uploadsingleimage
     *     uploadmuiltimage
     *     buttonlist
     *     multi-select
     *     div
     *     static
     *     number
     *     number-range
     *     radiolist
     *     checkboxlist
     * @example
     *     <caption>html</caption>
     *     <emap-form :options='options'></emap-form>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         data: function() {
     *             return {
     *                 options: {
     *                     pagePath: 'http://res.wisedu.com/fe_components/mock/page_model.json',
     *                     modelName: 'FORM_GROUP'
     *                 }
     *             }
     *         },
     *         ready: function() {
     *             // 页面右侧增加大纲列表
     *             $.bhFormOutline.show({
     *                 offset: {
     *                     right: 16,
     *                     top: 84
     *                 },
     *                 scrollOffsetTop: $("header.bh-header-mini").outerHeight(),
     *                 insertContainer: $(".eform-page")
     *             });
     *             $.bhAffix({
     *                 //浮动块所在的容器
     *                 hostContainer: $(".eform-page"),
     *                 //要浮动的容器
     *                 fixedContainer: $("div.bh-form-outline")
     *             });
     *         },
     *         components: {EmapForm}
     *     }
     */
    export default {
        /**
         * @property {Object} options 构造表单的选项设置
         * @property {Boolean} options.pagePath 模型请求地址
         * @property {Boolean} options.modelName 模型名称
         * @property {Boolean} [options.readonly=false] 是否只读
         * @property {String} [options.model=h] 表单样式'h'/'v'(水平/垂直)
         * @property {String} [options.size=M] 表单尺寸
         * @property {String} [options.cols=3] 只读表单列数
         * @property {String} [options.root] 模型根路径
         * @property {Boolean} [options.validate=true] 是否开启校验
         * @property {Boolean} [options.renderByGroup=true] 按照分组渲染表单
         * @property {Boolean} [options.autoColumn=true] 只读表单列宽自动补齐
         * @property {String} [options.inputWidth=6] 水平布局空间宽度
         * @property {String} [offsetTop=84] 大纲区域向下偏移位置
         * @property {String} [offsetRight=16] 大纲区域向左偏移位置
         * @property {String} [scrollTop='.bh-header-mini'元素的高度] 大纲区域向下偏移位置
         * @property {Boolean} [outline=true] 是否显示大纲
         * @property {DOMElement} [container] 大纲区域的容器，默认为 null，若outline为true需要设置此属性
         */
        props: {
            options: Object,
            offsetTop: {
                default: 84
            },
            offsetRight: {
                default: 16
            },
            scrollTop: {
                default: $('header.bh-header-mini').outerHeight()
            },
            outline: {
                type: Boolean,
                default: true
            },
            container: {
                default: null
            }
        },
        methods: {
            /**
             * 禁用某些控件
             * @param  {Array} ids 控件id数组
             */
            disableItem (ids) {
                $(this.$el).emapForm('disableItem', ids);
            },
            /**
             * 启用某些控件
             * @param  {Array} ids 控件id数组
             */
            enableItem (ids) {
                $(this.$el).emapForm('enableItem', ids);
            },
            /**
             * 真正保存上传的文件
             */
            saveUpload () {
                $(this.$el).emapForm('saveUpload');
            },
            /**
             * 显示某些控件
             * @param  {Array} ids 控件id数组
             */
            showItem (ids) {
                $(this.$el).emapForm('showItem', ids);
            },
            /**
             * 隐藏某些控件
             * @param  {Array} ids 控件id数组
             */
            hideItem (ids) {
                $(this.$el).emapForm('hideItem', ids);
            },
            /**
             * 获取表单所有值
             * @return {Object} 包含表单所有值的对象
             */
            getValue () {
                return $(this.$el).emapForm('getValue');
            },
            /**
             * 设置控件的值
             */
            setValue (val) {
                $(this.$el).emapForm('setValue', val);
            },
            /**
             * 校验重载，校验规则发生变化时会自动触发，一般不需要调用
             */
            reloadValidate () {
                $(this.$el).emapForm('reloadValidate');
            },
            /**
             * 获取数据模型
             * @return {Object} 数据模型
             */
            getModel () {
                return $(this.$el).emapForm('getModel');
            },
            /**
             * 主动校验输入
             * @return {Boolean} 是否通过校验
             */
            validate () {
                return $(this.$el).emapValidate('validate');
            },
            /**
             * 如果不传参数，则清空表单中所有值，
             * 如果传入参数是个数组，则清空该数组中为字段名称的控件值
             */
            clear (val) {
                return $(this.$el).emapForm('clear', val);
            },
            initForm (opts) {
                var datamodel = WIS_EMAP_SERV.getModel(opts.pagePath, opts.modelName, 'form');
                opts.data = datamodel;
                $(this.$el).emapForm(opts);
                this.reloadValidate();
                this.$dispatch('inited');
            },
            initOutline () {
                if (this.outline) {
                    if (!this.container) {
                        console.error('emap form 没有指定 container !');
                        return;
                    }

                    // 生成大纲
                    $.bhFormOutline.show({
                        offset: {
                            right: this.offsetRight,
                            top: this.offsetTop
                        },
                        scrollOffsetTop: this.scrollTop,
                        insertContainer: $(this.container)
                    });
                    $.bhAffix({
                        // 浮动块所在的容器
                        hostContainer: $(this.container),
                        // 要浮动的容器
                        fixedContainer: $('div.bh-form-outline')
                    });
                }
            },
            /**
             * 销毁
             */
            destroy () {
                $(this.$el).emapForm('destroy');
            }
        },
        ready () {
            var opts = this.options;
            this.initForm(opts);
            this.initOutline();

            this.$watch('options.readonly', (newVal, oldVal) => {
                this.destroy();
                this.initForm(opts);
            });
        }
    };
</script>

<style>
    body > main > article {
        min-height: 68px;
    }
</style>
