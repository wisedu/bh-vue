<template>
    <div></div>
</template>

<script>
    /**
     * 日期区域选择
     * @module BhTimepicker
     *
     * @example
     * <caption>html</caption>
     * <bh-timepicker></bh-timepicker>
     */

    /**
     * 初始化操作
     * @private
     */
    var _init = (vm) => {
        var opts = {
            defaultType: vm.type,
            format: vm.format,
            isDisable: vm.disabled,
            ready: () => {
                vm.$dispatch('ready');
            },
            selectedTime: (startTimeStr, endTimeStr) => {
                vm.$dispatch('change', startTimeStr, endTimeStr);
            }
        };

        if (vm.max || vm.min) {
            opts.range = {
                max: vm.max,
                min: vm.min
            };
        }

        if (vm.start || vm.end) {
            opts.time = {
                start: vm.start,
                end: vm.end
            };
        }

        $(vm.$el).bhTimePicker(opts);
    };

    /**
     * 增加属性监听处理
     * @private
     */
    var _addWatch = (vm) => {
        vm.$watch('start', (newVal) => {
            vm.setValue({startTime: newVal});
        });

        vm.$watch('end', (newVal) => {
            vm.setValue({endTime: newVal});
        });

        vm.$watch('disabled', (newVal) => {
            vm.setDisable(newVal);
        });
    };

    export default {
        /**
         * @property {String} [format='YYYY-MM-DD'] 时间格式
         * @property {Date} [max] 可选择的最大时间
         * @property {Date} [min] 可选择的最小时间
         * @property {Date} [start] 默认开始时间
         * @property {Date} [end] 默认结束时间
         * @property {Boolean} [disabled=false] 是否禁用
         */
        props: {
            format: {
                default: 'YYYY-MM-DD',
                type: String
            },
            max: Date,
            min: Date,
            start: Date,
            end: Date,
            disabled: {
                default: false,
                type: Boolean
            },
            type: {
                type: String,
                default: 'all'
            }
        },
        methods: {
            /**
             * 获取选择的值 （返回时间区域对象如 {startTime: '', endTime: ''}）
             * @return {Object} 当前选择的值,包含startTime和endTime属性
             */
            getValue () {
                return $(this.$el).bhTimePicker('getValue');
            },
            /**
             * 动态设置当前值
             * @param {Object} data 要设置的开始、结束时间
             */
            setValue (data) {
                return $(this.$el).bhTimePicker('setValue', data);
            },
            /**
             * 设置是否禁用
             * @param {Boolean} isDisable 是否禁用，true为禁用，false反之
             */
            setDisable (isDisable) {
                var method = isDisable ? 'setDisable' : 'setEnable';
                return $(this.$el).bhTimePicker(method);
            }
        },
        ready () {
            _init(this);
            _addWatch(this);
        }
    };
</script>
