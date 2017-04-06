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
     *     <bh-datetime :value.sync='dtval' :options='dtoptions'></bh-datetime>
     * @example
     *     <caption>javascript</caption>
     *     {
     *         dtval: '',
     *         dtoptions: {
     *             min: new Date(),
     *             dateFormat: 'MM-dd ',
     *             showTime: false
     *         }
     *     }
     */

    var getCurrent = (dtObj) => {
        if(dtObj.jqxDateTimeInput('selectionMode') !== 'range') {
            return dtObj.jqxDateTimeInput('getDate');
        } else {
            let range = dtObj.jqxDateTimeInput('getRange');
            let rtn = [];
            rtn[0] = moment(range.from).format('YYYY-MM-DD HH:mm:ss');
            rtn[1] = moment(range.to).format('YYYY-MM-DD HH:mm:ss');
            return rtn;
        }
    };

    var setCurrent = (dtObj, val) => {
        let old = getCurrent(dtObj);

        if(dtObj.jqxDateTimeInput('selectionMode') !== 'range') {
            if(old == val) return;
            dtObj.jqxDateTimeInput('setDate', val);
        } else {
            if(!$.isArray(val) || val.length < 2) {
                return;
            }
            if(old[0] === val[0] && old[1] === val[1]) return;
            dtObj.jqxDateTimeInput('setRange', val[0], val[1]);
        }
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
         * @property {String} [options.timeFormat=yyyy-MM-dd HH:mm] 包含时间的日期格式
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
             * 当selectMode为range时，设置初始值的方法
             * @param {Date} date1 起始时间
             * @param {Date} date2 结束时间
             */
            setRange (date1, date2) {
                return $(this.$el).jqxDateTimeInput('setRange', date1, date2);
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
        ready () {
            var self = this;

            var options = self.options = $.extend({}, self.defaultOpts, self.options);

            var formatStr = options.showTime ? options.timeFormat : options.dateFormat;

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

            jqObj.on('valueChanged', (event) => {
                self.value = getCurrent(jqObj);
            });

            self.$watch('value', (val) => {
                setCurrent(jqObj, val);
            });

            self.$watch('disabled', (val) => {
                el.jqxDateTimeInput({disabled: val});
            });
            //self.value = getCurrent(jqObj);
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxDateTimeInput('destroy');
        }
    };
</script>
