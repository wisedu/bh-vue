<template>
    <div></div>
</template>

<script>
    /**
     * 日期/时间控件
     * @module BhDatetime
     *
     * @fires textChanged - 文本变化的时候触发
     * @fires valueChanged - 值变化的时候触发
     *
     * @example
     *     <caption>html</caption>
     *     <bh-datetime :options='dtoptions'></bh-datetime>
     * @example
     *     <caption>javascript</caption>
     *     {
     *         dtoptions: {
     *             min: new Date(),
     *             dateFormat: 'MM-dd ',
     *             showTime: false
     *         }
     *     }
     */

    var getCurrent = (dtObj) => {
        return dtObj.jqxDateTimeInput('getDate');
    };

    var setCurrent = (dtObj, val) => {
        dtObj.jqxDateTimeInput('setDate', val);
    };

    export default {
        data () {
            return {
                defaultOpts: {
                    culture: 'zh-CN',
                    dateFormat: 'yyyy-MM-dd',
                    timeFormat: 'yyyy-MM-dd hh:mm',
                    showTime: true,
                    min: undefined,
                    max: undefined,
                    placeHolder: '',
                    selectionMode: 'default',
                    showFooter: false
                },
                jqxObj: null
            };
        },
        /**
         * @property {String} value 日期/时间值
         * @property {Object} options 常规设置
         * @property {String} [options.culture=zh-CN] 多语言设置
         * @property {String} [options.placeHolder] 输入提示文字
         * @property {String} [options.dateFormat=yyyy-MM-dd] 日期格式
         * @property {String} [options.timeFormat=yyyy-MM-dd hh:mm] 包含时间的日期格式
         * @property {Boolean} [options.showTime=true] 是否同时设置时间
         * @property {Date} [options.min=Date(1900, 1, 1)] 最小日期
         * @property {Date} [options.max=Date(2100, 1, 1)] 最大日期
         * @property {String} [options.selectionMode=default] 日期格式，可选 'none'/'default'/'range'
         * @property {Boolean} [options.showFooter=false] 是否显示底部区域
         * @property {Boolean} [disabled=false] 是否禁用
         */
        props: ['value', 'options', 'disabled'],
        methods: {
            /**
             * 获取显示的文本内容
             * @return {String} 显示的文本字符串
             */
            getText () {
                return $(this.$el).jqxDateTimeInput('getText');
            },
            /**
             * 获取当前值
             * @return {String} 当前选择的值
             */
            getValue () {
                return this.value;
            },
            /**
             * 设置最小时间
             * @param {Date} min 最小时间
             */
            setMinDate (min) {
                $(this.$el).jqxDateTimeInput('setMinDate', min);
            },
            /**
             * 设置最大时间
             * @param {Date} max 最大时间
             */
            setMaxDate (max) {
                $(this.$el).jqxDateTimeInput('setMaxDate', max);
            }
        },
        mounted () {
            var self = this;

            var options = self.options = $.extend({}, self.defaultOpts, self.options);

            var formatStr = options.showTime ? options.timeFormat : options.dateFormat;

            self.$nextTick(() => {
                var el = $(self.$el);
                var jqObj = self.jqxObj = el.jqxDateTimeInput({
                    formatString: formatStr,
                    showTimeButton: options.showTime,
                    min: options.min,
                    max: options.max,
                    culture: options.culture,
                    placeHolder: options.placeHolder,
                    selectionMode: options.selectionMode,
                    showFooter: options.showFooter
                });

                setCurrent(jqObj, this.value);
                el.jqxDateTimeInput({disabled: this.disabled});

                jqObj.on('change', (event) => {
                    self.value = getCurrent(jqObj);
                });

                self.$watch('value', (val) => {
                    setCurrent(jqObj, val);
                });

                self.$watch('disabled', (val) => {
                    el.jqxDateTimeInput({disabled: val});
                });

                self.value = getCurrent(jqObj);
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxDateTimeInput('destroy');
        }
    };
</script>
