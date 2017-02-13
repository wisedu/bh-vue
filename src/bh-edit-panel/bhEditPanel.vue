<template>
    <div class="scenes-ci-container-case bh-p-16 bh-border-h bh-border-v bh-mb-16" :class='{"bh-bg-success-5":!expand}'>
        <div class="sc-title-borderLeft bh-mr-32" :class='{"bh-mb-16":expand}' bh-role-form-outline='title'>
            {{title}}
            <i v-if='isLock' class='icon iconfont icon-lock bh-mh-16 bh-color-grey-3'></i>
        </div>
        <div class="bh-pull-right" v-if='!isEdit'>
            <a class='opt-text bh-mr-16' href='javascript:void(0)' @click='del' v-if='expand && canDel'>删除</a>
            <a class='opt-text bh-mr-16' href='javascript:void(0)' @click='edit' v-if='expand && canEdit'>修改</a>
            <i class='expand-icon' :class='iconCls' @click='toggle'></i>
        </div>
        <div v-if='expand'>
            <slot></slot>
        </div>
        <div class='btns bh-mt-16' v-if='isEdit'>
            <bh-button type='primary' @click='save'>保存</bh-button>
            <bh-button class='bh-ml-16' @click='cancel'>取消</bh-button>
        </div>
    </div>
</template>

<script>
    /**
     * 复杂面板组件，支持编辑，删除，锁定标志等常用功能
     * @module BhEditPanel
     *
     * @fires status-change 编辑状态发生切换时触发事件，参数为当前是否编辑的bool值
     *
     * @example
     * <caption>html</caption>
     * <bh-edit-panel title='用户信息' :on-edit='onEdit' :on-save='onSave' :on-cancel='onCancel' :on-del='onDel'>
     *     <emap-form></emap-form>
     * </bh-edit-panel>
     */
    import BhButton from '../bh-button/bhButton.vue';

    let _setPageFooter = () => {
        $.bhPaperPileDialog.resetPageFooter();
    };

    export default {
        /**
         * @property {String} title 标题
         * @property {Boolean} [canDel=false] 是否支持删除操作
         * @property {Boolean} [canEdit=true] 是否支持修改操作
         * @property {Boolean} [isLock=false] 是否显示锁定标志
         * @property {Boolean} [isEdit=false] 是否为编辑状态
         * @property {Boolean} [expand=false] 是否为展开状态
         * @property {Function} [onEdit] 切换到编辑状态时的回调函数，返回promise对象
         * @property {Function} [onSave] 执行保存时的回调函数，返回promise对象
         * @property {Function} [onDel] 执行删除时的回调函数，返回promise对象
         * @property {Function} [onCancel] 取消编辑时的回调函数，返回promise对象
         */
        props: {
            title: String,
            canDel: {
                default: false,
                type: Boolean
            },
            canEdit: {
                default: true,
                type: Boolean
            },
            isLock: {
                default: false,
                type: Boolean
            },
            isEdit: {
                default: false,
                type: Boolean
            },
            expand: {
                default: false,
                type: Boolean
            },
            onEdit: Function,
            onSave: Function,
            onDel: Function,
            onCancel: Function
        },
        computed: {
            iconCls () {
                var cls = {
                    'bh-ml-16': true,
                    'icon': true,
                    'iconfont': true
                };

                var toggleCls = this.expand ? 'icon-keyboardarrowup' : 'icon-keyboardarrowright';
                cls[toggleCls] = true;

                return cls;
            }
        },
        methods: {
            /**
             * 切换展开、收缩状态
             */
            toggle () {
                this.expand = !this.expand;
                this.$nextTick(() => {
                    _setPageFooter();
                });
            },
            /**
             * 设置编辑标志
             * @param {Boolean} edit true为编辑状态，false为只读
             * @private
             */
            setEdit (edit) {
                this.isEdit = edit;
                this.$emit('status-change', edit); // 状态变化事件
            },
            /**
             * 切换为编辑状态
             */
            edit () {
                this.onEdit && this.onEdit.call(this.$parent).then(() => {
                    this.setEdit(true);
                });
            },
            /**
             * 执行保存
             * @private
             */
            save () {
                this.onSave && this.onSave.call(this.$parent).then(() => {
                    this.setEdit(false);
                    _setPageFooter();
                });
            },
            /**
             * 执行删除
             * @private
             */
            del () {
                this.onDel && this.onDel.call(this.$parent).then((data) => {
                    this.setEdit(false);
                });
            },
            /**
             * 取消编辑
             * @private
             */
            cancel () {
                this.onCancel && this.onCancel.call(this.$parent).then(() => {
                    this.setEdit(false);
                    _setPageFooter();
                });
            }
        },
        components: {BhButton}
    };
</script>

<style scoped>
    .scenes-ci-container-case {
        border: 1px solid #eee;
    }

    .sc-title-borderLeft {
        display: inline-block;
    }

    .opt-text {
        vertical-align: text-bottom;
    }

    .expand-icon {
        cursor: pointer;
    }
</style>
