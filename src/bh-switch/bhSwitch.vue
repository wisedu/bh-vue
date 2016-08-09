<template>
    <div class="bh-switch" :class='theme'>
        <input type="checkbox" :disabled='disabled' @change='toggle($event)' v-model='toggled'>
        <label class="bh-switch-helper"></label>
        <label class="bh-switch-label bh-close">{{offText}}</label>
        <label class="bh-switch-label bh-open">{{onText}}</label>
    </div>
</template>

<script>
    /**
     * 开关按钮
     * @module BhSwitch
     *
     * @fires toggle -开关状态变化时触发，参数为 checked(是否打开)
     *
     * @example
     *     <caption>html</caption>
     *     <bh-switch :toggled.sync='aaaa' @toggle='showSwitch' on-text='default on' off-text='default off'></bh-switch>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *        data: function() {
     *            return {
     *                aaaa: true
     *            }
     *        },
     *        methods: {
     *            showSwitch: function(flag) {
     *                console.log('switch: ' + flag);      // 此处打印
     *                console.log('switch: ' + this.aaaa); // 都为改变之后的值
     *            }
     *        },
     *        components: {BhSwitch}
     *     }
     */
    export default {
        /**
         * @property {String} [onText=开] 开启时显示的文字
         * @property {String} [offText=关] 关闭时显示的文字
         * @property {Boolean} [toggled=true] 是否开启
         * @property {Boolean} [disabled=false] 是否禁用
         * @property {String} theme 自定义样式
         */
        props: {
            onText: {
                default: '开'
            },
            offText: {
                default: '关'
            },
            toggled: {
                default: true,
                type: Boolean
            },
            disabled: {
                default: false,
                type: Boolean
            },
            theme: {
                default: ''
            }
        },
        methods: {
            toggle (e) {
                this.$dispatch('toggle', e.target.checked);
            }
        }
    };
</script>
