<template>
    <div class='bh-window' :class='{"has-button": btns.length > 0}'>
        <div class='head'>
            <h3>{{title}}</h3>
        </div>
        <div class='content'>
            <slot name='content'></slot>
            <div class="buttons">
                <hr style="border:none;border-top: 1px solid #efefef;margin-bottom: 10px;">
                <template v-for='btn in btns'>
                    <button class="bh-btn {{btn.className}}" @click='btnClick(btn.callback)'>{{btn.text}}</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 弹窗
     * @module BhWindow
     *
     * @fires created - 窗口创建成功触发
     * @fires open - 窗口打开触发
     * @fires close - 窗口关闭触发
     *
     * @example
     *     <caption>html</caption>
     *     <bh-window :is-open.sync='dlg.show' :btns='dlg.btns' title='三体' :options='dlg.options' @close='dlgClosed'>
     *      <div slot='content'>
     *          <p>
     *              《三体》是刘慈欣创作的系列长篇科幻小说
     *          </p>
     *          <p>
     *              把中国科幻文学提升到了世界级的水平
     *          </p>
     *          <p>
     *              其第一部经过刘宇昆翻译后于2015年在美国出版，并获得了第73届雨果奖最佳长篇小说奖[1]  。
     *          </p>
     *      </div>
     *  </bh-window>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *      data: function() {
     *          return {
     *              remoteAddr: '',
     *              dlg: {
     *                  show: false,
     *                  btns: [{
     *                      className: 'bh-btn-primary',
     *                      text: '确定',
     *                      callback: function() {
     *                          console.log('ok');
     *                      }
     *                  }, {
     *                      className: 'bh-btn-default',
     *                      text: '取消',
     *                      callback: function() {
     *                          console.log('cancel')
     *                      }
     *                  }],
     *                  options: {
     *                      width: 500,
     *                  }
     *              }
     *          };
     *      },
     *      components: {BhWindow},
     *      methods: {
     *          open: function() {
     *              this.dlg.show = true;
     *          },
     *          close: function() {
     *              this.dlg.show = false;
     *          }
     *      }
     *  }
     */
    export default {
        data () {
            return {
                defaultOpts: {
                    resizable: false,
                    isModal: true,
                    modalOpacity: 0.3,
                    height: 'auto',
                    width: 500,
                    minWidth: 200,
                    minHeight: 300,
                    maxHeight: 1000,
                    maxWidth: 1000,
                    autoOpen: false,
                    inIframe: false
                },
                jqxObj: null
            };
        },
        /**
         * @property {String} [title] 弹窗标题
         * @property {Boolean} [isOpen=false] 是否显示
         * @property {Object[]} [btns] 弹窗底部按钮列表
         * @property {String} btns.text 按钮名称
         * @property {String} btns.className 按钮元素的class
         * @property {Function} btns.callback 按钮回调方法，参数为窗口根节点元素
         * @property {Object} [options] 其他参数
         * @property {Boolean} options.resizable=false 是否可以resize操作
         * @property {Boolean} options.isModal=true 是否显示为模态框
         * @property {Number} options.modalOpacity=0.3 遮罩透明度
         * @property {Number} options.height=auto 高度
         * @property {Number} options.width=500 宽度
         * @property {Number} options.minHeight=300 最小高度
         * @property {Number} options.minWidth=200 最小宽度
         * @property {Number} options.maxHeight=1000 最大高度
         * @property {Number} options.maxWidth=1000 最大宽度
         * @property {Boolean} options.autoOpen=false 是否自动打开
         * @property {Boolean} options.inIframe=false 是否在iframe内部
         */
        props: {
            title: String,
            isOpen: {
                default: false,
                type: Boolean
            },
            btns: {
                default () {
                    return [];
                }
            },
            options: Object
        },
        methods: {
            /**
             * 添加事件处理
             * @inner
             */
            addEvents () {
                var self = this;
                var el = $(self.$el);

                el.on('created', function (event) {
                    self.$dispatch('created');
                });

                el.on('close', function (event) {
                    // 关闭弹框钱销毁弹框内的表单实例
                    // var el = $(this.$el);
                    // var formObj = $('.bh-form-horizontal', el);
                    // if (formObj.length > 0) {
                    //     formObj.parent().emapForm('destroy');
                    // }

                    self.isOpen && (self.isOpen = false);
                    $('body').niceScroll();
                    self.$dispatch('close');
                });

                el.on('open', function (event) {
                    $('body').getNiceScroll().remove();
                    $('body').css({
                        'overflow': 'hidden',
                        'overflow-x': 'hidden',
                        'overflow-y': 'hidden'
                    });

                    self.$dispatch('open');
                });
            },
            /**
             * 获取窗口大小
             * @return {Object} 窗口大小对象，如 {width: 400, height: 400, position: [300, 200]}
             * @inner
             */
            getSize () {
                var options = this.options;

                var size = {
                    height: options.height,
                    width: options.width
                };

                var el = $(this.$el);

                size.width = options.width - 50;
                el.width(size.width);

                if (options.height == 'auto') {
                    var elHight = el.height();
                    size.height = (this.btns.length > 0) ? elHight + 142 : elHight + 24;
                }

                var iframeTop = 0;
                if (options.inIframe) {
                    var $iframeEle = $(window.frameElement);
                    if ($iframeEle.length > 0) {
                        iframeTop = $iframeEle.offset().top;
                    }
                }
                delete options.inIframe;

                size.position = [window.innerWidth / 2 - parseInt(size.width, 10) / 2, (top.window.innerHeight) / 2 - iframeTop + $(top.window).scrollTop() - parseInt(size.height, 10) / 2];

                return size;
            },
            recaculate () {
                this.options = $.extend(this.options, this.getSize());
            },
            /**
             * 初始化方法
             * @inner
             */
            init () {
                var self = this;
                var el = $(self.$el);

                var options = self.options = $.extend(self.defaultOpts, self.options);
                options.autoOpen = self.isOpen;

                this.recaculate();

                self.jqxObj = el.jqxWindow(options);
                this.addEvents();
            },
            /**
             * 打开窗口
             */
            open () {
                $(this.$el).jqxWindow('open');
            },
            /**
             * 关闭窗口
             */
            close () {
                $(this.$el).jqxWindow('close');
            },
            btnClick (callback) {
                if ((!callback) || (callback($(this.$el)) !== false)) {
                    this.close();
                    return;
                }
            }
        },
        ready () {
            var self = this;

            this.init();

            self.$watch('isOpen', (val) => {
                if (val) {
                    self.open();
                } else {
                    self.close();
                }
            });

            self.$watch('options.height', (val) => {
                $(self.$el).jqxWindow({height: val, position: 'center'});
            });

            self.$watch('options.width', (val) => {
                $(self.$el).jqxWindow({width: val, position: 'center'});
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.off('created');
            el.off('close');
            el.off('open');
            el.jqxWindow('destroy');
        }
    };
</script>

<style scoped>
    .bh-window {
        padding-bottom: 24px;
    }
    .content {
        /*padding-bottom: 72px;*/
    }

    .bh-window .buttons {
        position: absolute;
        bottom: 32px;
        width: 100%;
        left: 0;
        float: right;
        padding: 0 24px;
        text-align: right;
        display: none;
    }

    .bh-window.has-button {
        padding-bottom: 72px;
    }

    .bh-window.has-button .buttons {
        display: block;
    }
</style>
