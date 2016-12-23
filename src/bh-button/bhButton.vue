<template>
    <button :class="classObj" type='button'>
        <slot></slot><i v-if='icon' class='iconfont icon-{{icon}}'></i>
    </button>
</template>
<script>
    /**
     * 按钮组件
     * @module BhButton
     *
     * @example
     *  <bh-button type="primary" @click="add">新增</bh-button>
     *  <bh-button @click="del">删除</bh-button>
     */
    export default {
        computed: {
            classObj () {
                var cls = {
                    'bh-btn': true,
                    'bh-btn-small': this.small,
                    'waves-effect': this.waves,
                    'icon-right': this.iconDir !== 'left'
                };

                cls['bh-btn-' + this.type] = true;

                return cls;
            }
        },
        /**
         *  @property {String} [type=default] 按钮类型，类型有： default/primary/success/info/danger
         *  @property {Boolean} [small=true] 是否为小按钮
         *  @property {Boolean} [waves=true] 是否有点击动画效果
         *  @property {String} [icon] 按钮图标
         *  @property {String} [iconDir=left] 图标方向，可设置 'left'/'right'
         */
        props: {
            'small': {
                type: Boolean,
                default: true
            },
            'waves': {
                type: Boolean,
                default: true
            },
            'type': {
                default: 'default'
            },
            'icon': String,
            'iconDir': {
                default: 'left'
            }
        }
    };
</script>

<style scoped>
    i {
        float: left;
        margin-right: 3px;
    }

    .icon-right i {
        float: right;
        margin-left: 3px;
    }
</style>
