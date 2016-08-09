<template>
    <div class="scenes-cbrt-record bh-row" :class='{"scenes-cbrt-record-active": active}' v-show='isShow'>
        <div class="scenes-cbrt-left">
            <div class="scenes-cbrt-no">{{num}}</div>
        </div>
        <div class="scenes-cbrt-right">
            <div v-if='type === "panel"' :class="panelCls" sc-cbrt-id="{{num}}">
                <h3 class="scenes-cbrt-title">{{title}}</h3>
                <a href="javascript:void(0);" class="bh-tag bh-tag-primary no-active">{{tag}}</a>
                <div class="bh-text-caption bh-caption-default">{{caption}}</div>
                <div class="scenes-cbrt-toolbar">
                    <a href="javascript:void(0);" class="bh-btn-link" sc-cbrt-flag="switch" sc-cbrt-role="extend" @click='toggle'>
                        {{toggleText}}
                    </a>
                </div>
                <div v-el:container class="scenes-ci-container-block" :style='{height: currentHeight}' @transitionend='onAnimated'>
                    <slot></slot>
                </div>
            </div>
            <slot v-else></slot>
        </div>
    </div>
</template>

<script>
    /**
     * 竖向步骤条节点，作为 BhStepFlow 的子组件使用
     *
     * @module bhFlowNode
     * @see {@link module:BhStepFlow 竖向步骤条}
     *
     */

    export default {
        data () {
            return {
                isShow: true,
                active: false,
                originHeight: 0,
                currentHeight: 'auto'
            };
        },
        computed: {
            toggleText () {
                return this.expanded ? '收起' : '展开';
            },
            panelCls () {
                var cls = {
                    'scenes-cbrt-card-view': true,
                    'scenes-cbrt-card-item': !this.active,
                    'bh-card': this.active,
                    'bh-card-lv2': this.active,
                    'scenes-cbrt-card': this.active
                };

                return cls;
            }
        },
        /**
         * @property {String} num 步骤编号
         * @property {String} [type=panel] 容器类型，支持 panel/custom
         * @property {String} [title] 大标题内容，可以是传纯文本或html（容器为panel时有效）
         * @property {String} [caption] 小标题内容，可以是传纯文本或html（容器为panel时有效）
         * @property {String} [tag] 标签 html（容器为panel时有效）
         * @property {String} [toolbar] 标签 html（容器为panel时有效）
         * @property {Boolean} [expanded=false] 是否默认展开
         * @property {Boolean} [autoHide=false] 是否默认隐藏
         */
        props: {
            num: String,
            type: {
                default: 'panel'
            },
            title: String,
            caption: String,
            tag: String,
            toolbar: String,
            expanded: {
                type: Boolean,
                default: false
            },
            autoHide: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /**
             * 切换展开/收缩状态
             */
            toggle () {
                this.expanded = !this.expanded;
                this.currentHeight = this.expanded ? this.originHeight : 0;
                this.$dispatch('toggle-flow-node', this.num, this.expanded);
            },
            /**
             * 展开/收缩动画的回调方法
             * @inner
             */
            onAnimated () {
                this.active = this.expanded;

                // auto hide process
                if (!this.expanded && this.autoHide) {
                    this.isShow = false;
                }
            },
            /**
             * 隐藏节点
             */
            hide () {
                this.expanded = false;
                this.currentHeight = 0;
                this.$dispatch('toggle-flow-node', this.num, false);
            }
        },
        ready () {
            this.$nextTick(() => {
                if (this.$els.container) {
                    var height = this.$els.container.offsetHeight;
                    this.originHeight = height ? height + 'px' : 'auto';

                    if (!this.expanded) {
                        this.currentHeight = 0;
                    } else {
                        this.active = true;
                    }

                    this.isShow = !this.autoHide;
                }
            });
        },
        events: {
            'expand-flow-node' (num) {
                this.expanded = (num === this.num);

                if (this.expanded) {
                    this.autoHide && (this.isShow = true);
                    setTimeout(() => {
                        this.currentHeight = this.originHeight;
                    }, 0);
                } else {
                    this.currentHeight = 0;
                }
            },
            'collapse-flow-node' (num) {
                if (num === this.num) {
                    this.hide();
                }
            },
            'hide-flow-node' (num) {
                if (num === this.num) {
                    this.hide();
                }
            }
        }
    };
</script>

<style scoped>
    .scenes-cbrt-card-view {
        overflow: hidden;
    }

    .scenes-ci-container-block {
        overflow: hidden;
        transition: height 0.1s ease;
    }
</style>
