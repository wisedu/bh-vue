<template>
    <div>
    </div>
</template>

<script>
    /**
     * 基于 bootstrap-datetimepicker 的日期/时间控件，功能比 bh-datetime 更为强大。
     * <p>
     * 具体配置请参考<a href='http://eonasdan.github.io/bootstrap-datetimepicker/Options'>官方文档</a>
     * @module BhDatetimepicker
     *
     * @fires change - 选择日期变化的时候触发，参数为当前选择的日期值
     *
     * @example
     *     <caption>html</caption>
     *     <bh-datetimepicker :value.sync='dtval' :options='dtoptions'></bh-datetimepicker>
     * @example
     *     <caption>javascript</caption>
     *     {
     *         dtval: '',
     *         dtoptions: {
     *             minDate: '1986-01-01',
     *             format: 'yyyy-MM',
     *         }
     *     }
     */

    var getCurrent = (dtObj) => {
        return dtObj.bhDateTimePicker('getValue');
    };

    var setCurrent = (dtObj, val) => {
        return dtObj.bhDateTimePicker('setValue', val);
    };

    // bh组件提供的参数有限，很多情况需要获取bootstrap原始的dom进行处理
    var _getBsElem = (vm) => {
        return $('[bh-form-role=dateTimeInput]', $(vm.$el));
    };

    var _callBsMethods = function(vm, method) {
        let bsElem = _getBsElem(vm);
        let func = bsElem.data('DateTimePicker')[method];

        if (!func || (typeof func !== 'function')) {
            console.warn('no method in bootstrap-datetimepicker:' + method);
            return;
        }

        return func.apply(bsElem, [].slice.call(arguments, 2));
    };

    export default {
        data () {
            return {
                dtObj: null
            };
        },
        /**
         * @property {String} [value=null] 当前日期值（twoway）
         * @property {Boolean} [disabled=false] 是否禁用
         * @property {Object} [options=null] 参数配置（请参考 bootstrap-datetimepicker 官方文档）
         */
        props: ['value', 'disabled', 'options'],
        methods: {
            /**
             * 获取当前选中的日期值
             * @return {String} 当前选中的日期值
             */
            getValue () {
                return getCurrent(this.dtObj);
            },
            /**
             * 设置日期值
             * @param {String} val 要设置的日期字符串
             */
            setValue (val) {
                return setCurrent(this.dtObj, val);
            },
            /**
             * 清空已选日期
             */
            clear () {
                return setCurrent(this.dtObj, null);
            }
        },
        ready () {
            var self = this;
            var el = $(self.$el);
            var options = self.options;

            var jqObj = self.dtObj = el.bhDateTimePicker(options);

            el.on('dp.change', (event) => {
                let value = getCurrent(el);
                self.value = value;
                this.$dispatch('change', value);
            });

            self.$watch('value', (val) => {
                setCurrent(el, val);
            });

            self.$watch('disabled', (val) => {
                el.bhDateTimePicker('disabled', val);
            });
        },
        beforeDestroy () {
            // TODO: bhDateTimePicker 没有提供 destroy 方法，直接使用 bootstrp-datetimepicker 的接口
            _callBsMethods(this, 'destroy');
        }
    };
</script>
