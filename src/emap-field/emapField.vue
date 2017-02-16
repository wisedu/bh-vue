<template>
    <div></div>
</template>

<script>
    /**
     * emap组件字段占位
     * @module Field
     *
     * @example
     *     <caption>html</caption>
     *     <emap-field :options='options' :value='ABC' :disable='true'></emap-field>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         data: function() {
     *             return {
     *                 options: {
     *                     contextPath: 'mock'
     *                 }
     *             }
     *         },
     *         ready: function() {
     *         },
     *         components: {EmapField}
     *    }
     */

    export default {
        /**
         * @property {Object} options 初始化参数配置
         * @property {String} options.contextPath 支持上传的服务器地址
         * @property {String} [options.placeholder] 输入提示文字
         * @property {Boolean} [options.fullFilePath=false] 保存文件和图片的绝对路径
         * @property {Boolean} [options.dialogsInBody=false] 弹出框是否显示在页面body区域，而非编辑器区域
         * @property {Boolean} [options.disableDragAndDrop=true] 是否禁止拖放
         */
        props: ["value","disable","model","required"],
        computed: {
            // value: {
            //     get: function(){
            //         var formData = {};
            //         if(this.$el === null){
            //             return "";
            //         }else{
            //             WIS_EMAP_INPUT.getValue($(this.$el), formData);
            //             return formData;
            //         }
            //     },
            //     set: function(newValue){
            //         WIS_EMAP_INPUT.setValue($(this.$el), this.options.name, this.options.xtype, newValue);
            //     }
            // },
        },
        methods: {

        },
        ready () {
            var self = this;
            this.model["form.required"] = this.required;

            var model = WIS_EMAP_SERV.convertModel([this.model], "form");
            var field_html = WIS_EMAP_INPUT.renderPlaceHolder(model[0]);
            $(this.$el).html(field_html);
            $(this.$el).on("_formChange", function(event){
                var formData = {};
                var val = WIS_EMAP_INPUT.getValue($("[data-name=" + self.model.name + "]", self.$el), formData);
                self.value = val;
            });

            this.$watch('value', (newVal) => {
                if(newVal) {
                    var val = {};
                    val[this.model.name] = newVal;
                    WIS_EMAP_INPUT.formSetValue($(this.$el), val, {});
                }
            });
        },
        beforeDestroy () {
            // $(this.$el).emapEditor('destroy');
        }
    };
</script>
