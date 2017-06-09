/**
 * 页面相关操作的util方法集合
 * @module utils/pageUtil
 * @example
 * //引入
 * import pageUtil from 'bh-vue/utils/pageUtil'
 * // 使用
 * pageUtil.alert('警告信息');
 */

import './pageUtil.less';

export default {
    /**
     * 显示普通纸质弹窗，与下面的 showVuePaper 稍有不同
     * @param  {String} title   标题
     * @param  {String} content 内容，支持包含vue组件的html字符串
     * @param  {String} footer  页脚，支持包含vue组件的html字符串
     * @param  {Function} onReady 渲染完成的回调事件
     * @param  {Function} onClose 关闭弹框的回调事件
     */
    showPaper (title, content, footer, onReady, onClose) {
        this.showVuePaper(null, title, content, footer, onReady, onClose);
    },
    /**
     * 使用纸质弹窗展示vue组件
     * @param  {Object} [vm]      当前页面vm，如果为空则不会执行vue.compile
     * @param  {String} title   标题
     * @param  {String} content 内容，支持包含vue组件的html字符串
     * @param  {String} footer  页脚，支持包含vue组件的html字符串
     * @param  {Function} onReady 渲染完成的回调事件
     * @param  {Function} onClose 关闭弹框的回调事件
     */
    showVuePaper (vm, title, content, footer, onReady, onClose) {
        if (!vm) {
            console.warn('show vue paper dialog without vm, can use showPaper() instead !');
        }

        let opts = {
            title: title,
            content: content,
            ready ($header, $section, $footer, $aside) {
                if (vm) {
                    vm.$compile($section[0]); // 重新扫描动态插入的组件

                    if (title) {
                        vm.$compile($header[0]); // 重新扫描动态插入的组件
                    }

                    if (footer) {
                        vm.$compile($footer[0]); // 重新扫描动态插入的组件
                    }
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
     * 显示窗口对话框
     * @param  {String} title   标题
     * @param  {String} content 内容，支持包含vue组件的html
     * @param  {Object} [options] 附加参数
     * @param  {Object} [options.vm] view model对象，当内容包含vue组件时需要传递此对象
     * @param  {Object[]} [options.btns] 底部按钮
     * @param  {String} [options.btns.text] 底部按钮文字
     * @param  {Function} [options.btns.callback] 底部按钮回调函数，返回false则不会默认关闭窗口
     * @param {Function} [options.created] 创建成功执行的回调
     * @param {Function} [options.open] 窗口打开时执行的回调
     * @param {Function} [options.close] 窗口关闭时执行的回调
     * @param {Boolean} [options.resizable=false] 是否可以resize操作
     * @param {Boolean} [options.isModal=true] 是否显示为模态框
     * @param {Number} [options.modalOpacity=0.3] 遮罩透明度
     * @param {Number} [options.height=auto] 高度
     * @param {Number} [options.width=500] 宽度
     * @param {Number} [options.minHeight=300] 最小高度
     * @param {Number} [options.minWidth=200] 最小宽度
     * @param {Number} [options.maxHeight=1000] 最大高度
     * @param {Number} [options.maxWidth=1000] 最大宽度
     * @param {Boolean} [options.autoOpen=false] 是否自动打开
     *
     * @example
     * <caption>javascript</caption>
     * pageUtil.showWindow('测试对话框', '<bh-search></bh-search>', {
     *     vm: this, // this 指向当前页面的 vm, 因为包含bhSearch组件，需要传此参数
     *     btns: [{
     *         text: '确认',
     *         callback () {
     *             // 点击后不会关闭窗口
     *             return false;
     *         }
     *     }, {
     *         text: '取消',
     *         callback () {
     *             // 默认点击后会关闭窗口
     *         }
     *     }],
     *     close () {
     *         // 窗口关闭时会触发此处理
     *     }
     * }
     */
    showWindow (title, content, options) {
        let opts = $.extend({
            btns: [],
            resizable: false,
            isModal: true,
            modalOpacity: 0.3,
            height: 'auto',
            width: 500,
            minWidth: 200,
            minHeight: 300,
            maxHeight: 1000,
            maxWidth: 1000,
            autoOpen: true
            // inIframe: false
        }, options);

        // store and delete custom arguments
        let created = opts.created;
        let open = opts.open;
        let close = opts.close;
        let btns = opts.btns;
        let vm = opts.vm;
        delete opts.created;
        delete opts.open;
        delete opts.close;
        delete opts.btns;
        delete opts.vm;

        let hasButton = btns.length > 0;

        let clsName = hasButton ? 'has-button' : '';

        let btnsPanel = '';
        if (hasButton) {
            let btnsHtml = '';
            let index = 0;
            btns.forEach(btn => {
                let className = btn.className || 'bh-btn-default';
                btnsHtml += `<button class="bh-btn bh-window-btn ${className}" data-index='${index++}'>${btn.text}</button>`;
            });

            btnsPanel = `
                <div class='buttons'>
                    <hr style="border:none;border-top: 1px solid #efefef;margin-bottom: 10px;">
                    ${btnsHtml}
                </div>
            `;
        }

        let jqDom = $('<div>').addClass(`bh-window bh-pageutil-window ${clsName}`);
        jqDom.append(`
            <div class='head'>
                <h3>${title}</h3>
            </div>
            <div class='content'>
                ${content}
                ${btnsPanel}
            </div>
        `);

        jqDom.appendTo($('body'));

        // add event handlers
        jqDom.on('created', (event) => {
            let target = event.target;
            if (vm) { // support vue compile
                vm.$compile(target);
            }
            created && created(target);
        });

        jqDom.on('open', (event) => {
            // let target = event.target;
            // if (options.vm) { // support vue compile
            //     options.vm.$compile(target);
            // }
            open && open(event.target);
        });

        jqDom.on('close', (event) => {
            close && close(event.target);
            jqDom.jqxWindow('destroy');
            jqDom.off('click').off('close').off('open').off('created');
            jqDom.remove();
        });
        // 点击按钮事件触发
        let self = this;
        jqDom.on('click', '.bh-window-btn', function (event) {
            let target = $(event.target);
            let index = target.data('index');
            let callback = btns[index].callback;
            if (!callback || callback(target) !== false) {
                self.hideWindow();
            }
        });

        jqDom.jqxWindow(opts);
        jqDom.css('position', 'fixed');
    },
    /**
     * 关闭窗口（默认为销毁窗口，所以每次打开窗口都会重建）
     */
    hideWindow () {
        let jqDom = $('.bh-pageutil-window');
        if (jqDom.length > 0) {
            jqDom.jqxWindow('close');
            jqDom.jqxWindow('destroy');
            jqDom.off('click').off('close').off('open').off('created');
            jqDom.remove();
        }
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
     * 使用侧边栏属性弹窗
     * @param  {Object} [vm]    当前页面vm，如果为空则不会执行vue.compile
     * @param  {String} title   标题
     * @param  {String} content 内容，支持包含vue组件的html字符串
     * @param  {String} footer  页脚，支持包含vue组件的html字符串
     * @param  {Function} onReady 渲染完成的回调事件
     * @param  {Function} onClose 关闭弹框的回调事件
     */
    showSidePaper (vm, title, content, footer, onReady, onClose) {
        let opts = {
            title: title,
            content: content,
            ready ($header, $section, $footer) {
                if (vm) {
                    vm.$compile($section[0]); // 重新扫描动态插入的组件

                    if (title) {
                        vm.$compile($header[0]); // 重新扫描动态插入的组件
                    }

                    if (footer) {
                        vm.$compile($footer[0]); // 重新扫描动态插入的组件
                    }
                }

                onReady && onReady($header, $section, $footer, $aside);
            },
            close: onClose
        };

        if (footer) {
            opts.footer = footer;
        }

        $.bhPropertyDialog.show(opts);
    },
    hideSidePaper () {
        $.bhPropertyDialog.hide();
    },
    /**
     * 警告信息框
     * @param  {String}   content  警告内容
     * @param  {Function} callback 点击确定按钮的回调
     * @param {Object} [options] 附加参数，支持自定义按钮和标题文字
     * @param {String} options.title 标题文字，默认获取多语言 Vue.t('basic.alert')
     * @param {String} options.btnText 按钮文字，默认获取多语言 Vue.t('basic.ok')
     */
    alert (content, callback, options) {
        let title = (!Vue.t || Vue.t('basic.alert') === 'basic.alert') ? '警告' : Vue.t('basic.alert');
        let ok = (!Vue.t || Vue.t('basic.ok') === 'basic.ok') ? '确定' : Vue.t('basic.ok');

        let opts = $.extend({
            title: title,
            btnText: ok
        }, options);

        BH_UTILS.bhDialogWarning({
            title: opts.title,
            buttons: [{
                text: opts.btnText,
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
     * @param {Object} [options] 附加参数，支持自定义按钮和标题文字
     * @param {Function} callbackCancel 点击取消按钮的回调
     * @param {String} options.title 标题文字，默认获取多语言 Vue.t('basic.alert')
     * @param {String} options.ok 确定按钮的文字，默认获取多语言 Vue.t('basic.ok')
     * @param {String} options.cancel 取消按钮的文字，默认获取多语言 Vue.t('basic.cancel')
     */
    confirm (content, callback, options, callbackCancel) {
        let title = (!Vue.t || Vue.t('basic.alert') === 'basic.alert') ? '警告' : Vue.t('basic.alert');
        let ok = (!Vue.t || Vue.t('basic.ok') === 'basic.ok') ? '确定' : Vue.t('basic.ok');
        let cancel = (!Vue.t || Vue.t('basic.cancel') === 'basic.cancel') ? '取消' : Vue.t('basic.cancel');
        let opts = $.extend({
            title: title,
            ok: ok,
            cancel: cancel
        }, options);

        BH_UTILS.bhDialogWarning({
            title: opts.title,
            buttons: [{
                text: opts.ok,
                className: 'bh-btn-primary',
                callback:callback
            }, {
                text: opts.cancel,
                className: 'bh-btn-default',
                callback:callbackCancel
            }],
            content: content
        });
    },
    /**
     * 设置历史信息的提示文字，【此方法与业务相关，一般不需调用】
     * @param {Object} vm   当前页面vm
     * @param {String} text 提示文字
     */
    setTipInfo (vm, text) {
        if (!vm) {
            console.log('set tip info failed, no vm specified !');
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
    exportFile (submitUrl, modelUrl, modelName, params) {
        if (!submitUrl || !modelUrl || !modelName) {
            console.log('export file failed, invalid arguments!', arguments);
            return;
        }

        let model = WIS_EMAP_SERV.getModel(modelUrl, modelName);
        let columns = model.map((item) => {
            return {
                name: item.name,
                hidden: false
            };
        });

        let title = (!Vue.t || Vue.t('basic.select_export_cols') === 'basic.select_export_cols') ? '请选择要导出的列' : Vue.t('basic.select_export_cols');

        $.bhCustomizeColumn({
            title: title,
            model: model,
            columns: columns,
            callback (cols) {
                let ids = [];
                cols.forEach((item) => {
                    (!item.hidden) && ids.push(item.name);
                });

                let colStr = ids.join(',');

                let url = `${submitUrl}?colnames=${colStr}`;

                if (params) {
                    let suffix = '';
                    for (let key in params) {
                        suffix += ('&' + key + '=' + params[key]);
                    }

                    url = url + suffix;
                }

                window.open(url);
            }
        });
    },
    /**
     *@property {Object} options 轮播初始化参数
     * @property {String} [options.showType=page] 渲染的类型
     * @property {String} [options.selector] 渲染的容器
     * @property {Array} [options.dataSource=[{
        image: 'http://res.wisedu.com/fe_components/galleria/gallery.png'
    }, {
        image: 'http://res.wisedu.com/fe_components/galleria/gallery_thin.png'
    }, {
        image: 'http://res.wisedu.com/fe_components/galleria/gallery.png'
    }]] 轮播的图片列表
     * @property {String} [options.height] 高度
     * @property {String} [options.weight] 宽度
     * @property{num}[options.show]从当前第几个开始轮播
     */
    galleryPic(options){
        $.bhGallery(options)
    }
};
