<template>
    <div></div>
</template>

<script>
    /**
     * 视图大纲，从表单组件中分离出来可独立使用
     * @module BhOutline
     *
     * @example
     * <caption>html</caption>
     *  <bh-outline :host-container='hostContainer' :form-container='formContainer'></bh-outline>
     * <caption>javascript</caption>
     *  export default {
     *     ready () {
                this.hostContainer = $(this.$el);
                this.formContainer = $(this.$el);
           }
     *  }
     */

    var _init = (vm) => {
        // 生成大纲
        $.bhFormOutline.show({
            offset: {
                right: vm.offsetRight,
                top: vm.offsetTop
            },
            scrollOffsetTop: vm.scrollTop,
            insertContainer: vm.formContainer
        });
        $.bhAffix({
            // 浮动块所在的容器
            hostContainer: vm.hostContainer,
            // 要浮动的容器
            fixedContainer: vm.hostContainer.find('.bh-form-outline')
        });
    };

    export default {
        /**
         * @property {Object} formContainer 表单容器，jquery对象
         * @property {Object} hostContainer 宿主容器，jquery对象
         * @property {Number} offsetTop 距顶部的绝对偏移
         * @property {Number} offsetRight 距右边绝对偏移
         * @property {Number} scrollTop 默认滚动高度
         */
        props: {
            formContainer: Object, // form container
            hostContainer: Object,
            offsetTop: {
                default: 0
            },
            offsetRight: {
                default: 16
            },
            scrollTop: {
                default: $('header.bh-header-mini').outerHeight()
            }
        },
        methods: {
            init () {
                _init(this);
            }
        },
        ready () {
            this.$watch('formContainer', (newVal) => {
                if (!newVal) {
                    return;
                }

                this.init();
            });
        }
    };
</script>
