/**
 * @module directives/bhLoading Vue指令，显示处于加载状态的loading框
 *
 * @example
 * <caption>html</caption>
 * <div v-bh-loading='loading' :loading-mask='false'>测试loading指令</div>
 *
 * @example
 * <caption>javascript</caption>
 * import 'bh-vue/directives/loading'; // 全局注册指令，只需引入一次
 * export default {
 *    data: () => ({
 *        loading: false
 *    }),
 *    methods: {
 *        queryData () {
 *            this.loading = true;
 *            // do async query...
 *            // then ...
 *            this.loading = false;
 *        }
 *    }
 * }
 */

const LOADING_CLS = 'bh-loading-directive';
const body = $('body');

const _showLoading = (container, loadingText, loadingMask) => {
    container = container || body;

    let opts = $.extend({
        autoOpen: true,
        isModal: true,
        text: 'Loading'
    }, {
        isModal: loadingMask,
        text: loadingText
    });

    let loadingPanel = container.find('.' + LOADING_CLS);
    if (loadingPanel.length === 0) { // 若不存在则新增，否则复用
        loadingPanel = $('<div>').addClass(LOADING_CLS).appendTo(container);
        loadingPanel.jqxLoader(opts);
    } else {
        loadingPanel.jqxLoader('open');
    }
};

const _hideLoading = (container) => {
    container = container || body;

    let loadingPanel = container.find('.' + LOADING_CLS);
    if (loadingPanel.length === 0) {
        return;
    }

    loadingPanel.jqxLoader('close');
};

const _destroyLoading = (container) => {
    container = container || body;

    let loadingPanel = container.find('.' + LOADING_CLS);
    if (loadingPanel.length === 0) {
        return;
    }

    loadingPanel.jqxLoader('close');
    loadingPanel.jqxLoader('destroy');
    loadingPanel.remove();
};

Vue.directive('bh-loading', {
    /**
     * @property {Boolean} [loadingMask=true] 是否显示遮罩层
     */
    params: ['loadingText', 'loadingMask'],
    update: function (newValue, oldValue) {
        if (newValue) {
            let params = this.params;
            _showLoading(null, params.loadingText, params.loadingMask);
        } else {
            _hideLoading(null, $(this.el));
        }
    },
    unbind: function () {
        _destroyLoading(null, $(this.el));
    }
});
