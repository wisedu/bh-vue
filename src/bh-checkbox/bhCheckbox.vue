<template>
    <label v-if='inGroup' :class='{"bh-disabled": disabled}'>
        <input type="checkbox" :value="value" @change.stop='change($event)' v-model='ischeck' :disabled='disabled'>
        <i class="bh-choice-helper"></i>
        <slot></slot>
    </label>
    <div v-else class="bh-checkbox">
        <label :class='{"bh-disabled": disabled}'>
            <input type="checkbox" :value="value" @change.stop='change($event)' v-model='ischeck' :disabled='disabled'>
            <i class="bh-choice-helper"></i>
            <slot></slot>
        </label>
    </div>
</template>

<script>
    /**
     * 复选框
     * @module BhCheckbox
     * @fires change - 选择状态发生变化时触发，参数为数据对象：{value: 1, checked: true, el: dom, extra: {a:1, b:2}}
     *
     * @example
     *     <bh-checkbox ischeck='false' :disabled='flag'></bh-checkbox>
     */
    export default {
        data () {
            return {
                /**
                 * jqxObj jqwidget 对象
                 * @type {Object}
                 * @inner
                 */
                jqxObj: null
            };
        },
        /**
         * @property {String}  value - 绑定框
         * @property {Boolean}  [ischeck=false] - 是否选中
         * @property {Boolean}  [disabled=false] - 是否禁止操作
         * @property {Object} [extra] 绑定的数据，除了name/value之外需要额外绑定的数据，可以在change事件中获取此属性
         * @property {Boolean} [inGroup=false] 是否在checklist中，一般不需要修改此属性
         */
        props: {
            inGroup: {
                type: Boolean,
                default: false
            },
            extra: Object,
            value: {
                default: ''
            },
            ischeck: {
                default: false
            },
            disabled: {
                default: false,
                type: Boolean
            }
        },
        methods: {
            /**
             * 状态变化
             * @inner
             */
            change: function (e) {
                this.$dispatch('change', {value: this.value, checked: e.target.checked, el: this.$el, extra: this.extra});
            }
        }
    };
</script>
