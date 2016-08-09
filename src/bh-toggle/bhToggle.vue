<template>
    <input type="button" v-model="val" class='bh-btn bh-btn-primary bh-btn-small' />
</template>

<script>
    /**
     * 开关按钮（按下/弹起）
     * @module BhToggle
     * @example
     * <caption>html</caption>
     * <bh-toggle :toggled='toggled' on-text='开启' off-text='关闭' @toggle='toggle'></bh-toggle>
     */
    export default {
        data () {
            return {
                jqxObj: null
            };
        },
        computed: {
            val () {
                return this.toggled ? this.onText : this.offText;
            }
        },
        /**
         * @property {String} [onText=开] 开启时显示的文字
         * @property {String} [onText=关] 关闭时显示的文字
         * @property {String} [w=auto] 宽度
         * @property {Boolean} [toggled=true] 是否开启
         * @property {Boolean} [disabled=false] 是否禁用
         */
        props: {
            onText: {
                default: '开'
            },
            offText: {
                default: '关'
            },
            w: {
                default: 'auto' // 100%, 20
            },
            toggled: {
                default: true,
                type: Boolean
            },
            disabled: {
                default: false,
                type: Boolean
            }
        },
        methods: {
            /**
             * 是否开启
             * @return {Boolean} 若开启返回true，反之false
             */
            isToggled () {
                return this.jqxObj.jqxToggleButton('toggled');
            },
            /**
             * 切换状态
             */
            toggle () {
                this.toggled = this.jqxObj.jqxToggleButton('toggled');
                this.$dispatch('toggle', this.toggled);
            }
        },
        ready () {
            var self = this;
            var el = $(this.$el);

            this.jqxObj = el.jqxToggleButton({
                width: this.w,
                toggled: this.toggled,
                disabled: this.disabled
            });

            el.on('click', () => {
                self.toggle();
            });
        },
        beforeDestroy () {
            $(this.$el).off('click');
            $(this.$el).jqxButton('destroy');
        }
    };
</script>
