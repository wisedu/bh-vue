/**
 * 页面相关操作的util方法集合
 * @module utils/pageUtil
 * @example
 * //引入
 * import pageUtil from 'bh-vue/utils/pageUtil'
 * // 使用
 * pageUtil.alert('警告信息');
 */
export default {
    /**
     * 使用纸质弹窗展示vue组件
     * @param  {Object} vm      当前页面vm
     * @param  {String} title   标题
     * @param  {String} content 内容，支持包含vue组件的html字符串
     * @param  {String} footer  页脚，支持包含vue组件的html字符串
     * @param  {Function} onReady 渲染完成的回调事件
     * @param  {Function} onClose 关闭弹框的回调事件
     */
    showVuePaper (vm, title, content, footer, onReady, onClose) {
        let opts = {
            title: title,
            content: content,
            ready ($header, $section, $footer, $aside) {
                vm.$compile($section[0]); // 重新扫描动态插入的组件

                if (footer) {
                    vm.$compile($footer[0]); // 重新扫描动态插入的组件
                }
                onReady && onReady($header, $section, $footer, $aside);
            },
            close: onClose
        };

        if (footer) {
            opts.footer = footer;
        }

        $.bhPaperPileDialog.show(opts);
    },
    /**
     * 隐藏纸质弹窗，
     * 不过按目前的用法一般是要同时销毁的，因为打开的时候是重新渲染一个新的view
     */
    hidePaper () {
        $.bhPaperPileDialog.hide();
        $.bhPaperPileDialog.destroy();
    },
    /**
     * 显示 popover 弹框
     * @param {Object} target  目标元素，即popover弹出位置的元素，为jquery对象
     * @param {String} content 内容
     * @param {Object} [options] 其他参数
     * @param {String} [options.width=300] 宽度
     * @param {String} [options.height] 高度
     * @param {String} [options.autoClose=true] 点击页面其他区域popover是否自动关闭
     * @param {Boolean} [options.showCloseButton=true] 是否显示关闭按钮
     * @param {Boolean} [options.isModal=false] 是否有模态遮罩层
     * @param {Function} [options.ready] 弹出成功回调
     * @param {Function} [options.beforeClose] 关闭之前的回调
     * @param {Function} [options.close] 关闭的回调
     * @param {Object[]} [options.btns] 自定义按钮列表
     * @param {String} [options.btns.name] 自定义按钮名称，监听事件用
     * @param {String} [options.btns.title] 自定义按钮显示文字
     * @param {String} [options.btns.callback] 自定义按钮回调，若返回false则不关闭弹框
     */
    showPopover (target, content, options) {
        let opts = $.extend({
            selector: target,
            content: content
        }, options);

        let btns = opts.btns;
        if (btns && btns.length > 0) {
            // 加入自定义按钮列表在底部
            let btnHtml = '';
            let eventMap = {}; // 将按钮数组转为 map 结构，方便事件触发的处理
            btns.forEach(btn => {
                btn.callback && (eventMap[btn.name] = btn.callback);
                btnHtml += `<a href='javascript:void(0)' class='bh-ph-8 user-btn' data-name='${btn.name}'>${btn.title}</a>`;
            });
            opts.content += `<div class='bh-mt-16 bh-text-right'>${btnHtml}</div>`;

            // 重写 ready 方法，加入对 btns 的处理
            let oldReady = opts.ready;
            opts.ready = (popWindow) => {
                popWindow.on('click', '.user-btn', (event) => {
                    let btnName = $(event.target).data('name');
                    if (eventMap[btnName]) {
                        if (eventMap[btnName](popWindow) !== false) {
                            $.bhPopOver.close();
                        }
                    } else {
                        $.bhPopOver.close();
                    }
                });
                oldReady && oldReady(popWindow);
            };

            // 重写关闭方法，解除事件绑定
            let oldBeforeClose = opts.beforeClose;
            opts.beforeClose = (popWindow) => {
                eventMap = {}; // 清除事件缓存
                popWindow.off('click', '.user-btn');
                oldBeforeClose && oldBeforeClose(popWindow);
                opts = {};
            };
        }

        $.bhPopOver(opts);
    },
    /**
     * 关闭 popover 弹框
     */
    hidePopover () {
        $.bhPopOver.close();
    },
    /**
     * 重置纸质弹框页脚
     */
    resetPageFooter () {
        $.bhPaperPileDialog.resetPageFooter();
        $.bhPaperPileDialog.resetDialogFooter();
    },
    /**
     * 重置纸质弹框页脚
     */
    resetDialogFooter () {
        $.bhPaperPileDialog.resetDialogFooter();
    },
    /**
     * 警告信息框
     * @param  {String}   content  警告内容
     * @param  {Function} callback 点击确定按钮的回调
     */
    alert (content, callback) {
        BH_UTILS.bhDialogWarning({
            title: Vue.t('basic.alert'),
            buttons: [{
                text: Vue.t('basic.ok'),
                className: 'bh-btn-default'
            }],
            content: content,
            callback: callback
        });
    },
    /**
     * 确认信息弹框
     * @param  {String}   content  信息内容
     * @param  {Function} callback 点击确认按钮的回调
     */
    confirm (content, callback) {
        BH_UTILS.bhDialogWarning({
            title: Vue.t('basic.alert'),
            buttons: [{
                text: Vue.t('basic.ok'),
                className: 'bh-btn-primary'
            }, {
                text: Vue.t('basic.cancel'),
                className: 'bh-btn-default'
            }],
            content: content,
            callback: callback
        });
    },
    /**
     * 设置历史信息的提示文字，【此方法与业务相关，一般不需调用】
     * @param {Object} vm   当前页面vm
     * @param {String} text 提示文字
     */
    setTipInfo (vm, text) {
        if (!vm) {
            return;
        }

        vm.$dispatch('confirm-text', text);
    },
    /**
     * 文字信息提示
     * @param  {String} msg   信息字符串
     * @param  {String} state 信息状态，支持'success'/'danger'/'warning' etc
     */
    tip (msg, state) {
        $.bhTip({
            state: state,
            content: msg
        });
    },
    /**
     * 导出文件
     * @param  {String} submitUrl 提取导出请求的服务器地址
     * @param  {String} modelUrl  获取模型的地址
     * @param  {String} modelName 模型名称
     */
    exportFile (submitUrl, modelUrl, modelName) {
        let model = WIS_EMAP_SERV.getModel(modelUrl, modelName);
        let columns = model.map((item) => {
            return {
                name: item.name,
                hidden: false
            };
        });

        $.bhCustomizeColumn({
            title: Vue.t('basic.select_export_cols'),
            model: model,
            columns: columns,
            callback (cols) {
                let ids = [];
                cols.forEach((item) => {
                    (!item.hidden) && ids.push(item.name);
                });

                let colStr = ids.join(',');
                window.open(`${submitUrl}?colnames=${colStr}`);
            }
        });
    }
};
