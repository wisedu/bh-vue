<template>
    <div class="bh-tooltip">
        <header></header>
        <div class="content">
            <slot></slot>
        </div>
        <footer v-if='showFooter' @click='close' class='bh-text-caption bh-color-caption'>
            <div class='bh-pull-right'>{{closeText}}</div>
        </footer>
    </template>
</div>

<script>
    /**
     * 工具提示
     * @module BhTooltip
     * @example
     * <caption>html</caption>
     * <bh-tooltip :target='target'>
     *     <p>
     *         这是提示内容
     *     </p>
     *     <a href="#">
     *         支持html格式
     *     </a>
     * </bh-tooltip>
     */

    var initTooltip = (vm) => {
        if (vm.target) {
            $(vm.target).jqxTooltip({
                content: vm.$el,
                position: vm.position,
                autoHide: vm.autoHide,
                closeOnClick: vm.clickClose
            });
        }
    };

    export default {
        /**
         * @property {String} taget 目标元素，可以为dom元素对象或者jquery选择器字符串
         * @property {Boolean} [autoHide=true] 是否自动隐藏
         * @property {String} [position=default] 提示框显示的位置，支持top/bottom/left/right/top-left/bottom-left/top-right/bottom-right/mouse/mouseenter/default
         * @property {Boolean} [clickClose=false] 是否在点击的时候关闭
         * @property {Boolean} [showFooter=false] 是否显示底部关闭提示
         * @property {String} [closeText=我知道了] 底部关闭提示的文字
         */
        props: {
            target: {
                default: null
            },
            autoHide: {
                type: Boolean,
                default: true
            },
            position: {
                type: String,
                default: 'default'
            },
            clickClose: {
                type: Boolean,
                default: false
            },
            showFooter: {
                type: Boolean,
                default: false
            },
            closeText: {
                default: '我知道了'
            }
        },
        ready () {
            initTooltip(this);

            this.$watch('target', (newVal) => {
                initTooltip(this);
            });
        },
        beforeDestroy () {
            this.destroy();
        },
        methods: {
            /**
             * 关闭提示框
             */
            close () {
                if (this.target) {
                    $(this.target).jqxTooltip('close');
                }
            },
            destroy () {
                if (this.target) {
                    $(this.target).jqxTooltip('destroy');
                }
            }
        }
    };
</script>

<style scoped>
    footer > div {
        cursor: pointer;
    }
</style>