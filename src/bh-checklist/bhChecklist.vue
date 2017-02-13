<template>
    <div class='bh-checkbox' :class='dirClass'>
        <bh-checkbox
            :style='subStyle'
            :in-group='true'
            :extra='item'
            v-for='item in source'
            :value='item[valueMember]'
            :disabled='item.disabled'
            :ischeck='item[checkMember]'
            @change='itemChange'>
            {{item[displayMember]}}
        </bh-checkbox>
    </div>
</template>

<script>
    /**
     * 复选框组
     * @module BhChecklist
     * @fires change - 其中一项的选择状态发生变化时触发，参数为选择的值及状态，如 {value: 1, checked: true, el: dom, extra: {a:1, b:2}}
     *
     * @example
     *     <caption>html</caption>
     *     <bh-checklist ref=chklist1 display-member='label' :source='fruits' dir='h'></bh-checklist>
     */

    import BhCheckbox from '../bh-checkbox/bhCheckbox';

    export default {
        data () {
            return {};
        },
        computed: {
            dirClass () {
                return this.dir === 'v' ? 'bh-checkbox-vertical' : '';
            },
            subStyle () {
                return {
                    display: this.dir === 'v' ? 'block' : 'inline-block'
                };
            }
        },
        /**
         * @property {Array}  source - 待选项列表
         * @property {String}  [dir=h] - 排列方向，支持 'h'（水平）/'v'（垂直）
         * @property {String} [displayMember=name] 要显示的字段名称
         * @property {String} [valueMember=value] 作为 value 的字段名称
         * @property {String} [checkMember=checked] 作为是否选中的字段名称
         */
        props: {
            checkMember: {
                default: 'checked'
            },
            displayMember: {
                default: 'name'
            },
            valueMember: {
                default: 'value'
            },
            dir: {
                default: 'h'
            },
            source: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            /**
             * 获取选择的列表
             * @return {Array} 已经选择的列表
             */
            getChecked () {
                var vm = this;
                return $.grep(vm.source, (item) => {
                    return item[vm.checkMember];
                });
            },
            itemChange (data) {
                if (!data.extra) {
                    return;
                }

                var vm = this;
                extra[vm.checkMember] = data.checked;
                extra[vm.valueMember] = data.value;

                vm.$emit('change', data);
            }
        },
        components: {BhCheckbox}
    };
</script>
