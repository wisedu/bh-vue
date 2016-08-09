<template>
    <div class="bh-radio" :class='dirClass'>
        <label v-for='item in items' :class='{"bh-disabled": item.disabled}'>
            <input name='radio-btn-{{uuid}}' type="radio" :value="item.value" :disabled="item.disabled" v-model='value' @change.stop='onchange'>
            <i class="bh-choice-helper"></i>
            {{item.name}}
        </label>
    </div>
</template>

<script>
    /**
     * 单选框组
     * @module BhRadio
     *
     * @fires change 选择项发生变化时触发，参数为当前选择项的value
     *
     * @example
     *     <caption>html</caption>
     *     <bh-radio :items='fruits' :value.sync='selVal' dir='v' @change='radioChange'></bh-radio>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *        data: function() {
     *            return {
     *                fruits: [{
     *                    name: 'apple',
     *                    value: 'a1',
     *                    disabled: false
     *                }, {
     *                    name: 'orange',
     *                    value: 'o1',
     *                    disabled: true
     *                }, {
     *                    name: 'peach',
     *                    value: 'o2',
     *                    disabled: false
     *                }],
     *                selVal: 'o2'
     *            }
     *        },
     *        methods: {
     *            radioChange: function(val) {
     *                console.log('change: ' + val);
     *            }
     *        },
     *        components: {BhRadio}
     *     }
     */
    var uuid = 0;

    export default {
        data () {
            return {
                uuid: uuid++
            };
        },
        computed: {
            dirClass () {
                return this.dir === 'v' ? 'bh-radio-vertical' : '';
            }
        },
        /**
         * @property {String} value 选择项的value
         * @property {Object[]} items 待选列表
         * @property {String} items.name 显示名称
         * @property {String} items.value 值
         * @property {Boolean} items.disabled 是否禁用
         * @property {String} [dir=h] 排列方向(水平/垂直)，支持 'h'/'v'
         */
        props: {
            value: '',
            items: {
                default: []
            },
            dir: {
                default: 'h'
            }
        },
        methods: {
            onchange (e) {
                this.$dispatch('change', this.value);
            }
        }
    };
</script>
