<template>
    <div class='bh-uploader'>
        <a v-if='type === "link"' class="bh-file-upload" href="javascript:void(0)">
            <input v-el:linkfile class='file-input' type="file"/>{{text}}
        </a>
        <button v-if='type === "button"' type='button' class='bh-btn bh-btn-primary bh-btn-large waves-effect'>
            <input v-el:buttonfile class='file-input' type="file"/>{{text}}
        </button>
    </div>
</template>

<script>
    /**
     * 简单的文件上传组件，选择文件直接上传
     * @module BhUploader
     *
     * @fires done - 文件上传成功后触发，参数可参考文档(https://github.com/blueimp/jQuery-File-Upload/wiki/Options)的 done callback
     * @fires failed - 文件上传失败后触发，参数可参考文档(https://github.com/blueimp/jQuery-File-Upload/wiki/Options)的 fail callback
     * @fires etype - 支持的文件类型检查错误，设置 fileType 时才生效
     */

    const _checkFileType = (fileName, types) => {
        if (!fileName || !types || types.length === 0) {
            return true;
        }

        let m = fileName.match(/\.\w+$/);
        if (m && m.length !== 1) {
            return false;
        }

        let ext = m[0];
        return $.inArray(ext, types) > -1;
    };

    /**
     * 初始化jquery fileupload控件
     */
    const _init = function() {
        let vm = this,
            input = $(vm.elInput);

        if (!vm.url) {
            console.warn('Initialize file uploader failed: upload url is null !');
            return false;
        }

        let options = {
            url: vm.url,
            autoUpload: true,
            dataType: 'json',
            add (e, data) {
                let canSubmit = true;

                // 校验文件类型
                const fileType = vm.fileType;
                if (fileType && fileType.length > 0 && data.files && data.files.length > 0) {
                    if (!_checkFileType(data.files[0].name, fileType)) {
                        vm.$dispatch('etype', {data, msg: '不支持的文件格式'});
                        return;
                    }
                }

                // 若前置校验显示返回 false，则不进行提交操作
                if (vm.callbacks && vm.callbacks.beforeSubmit && (vm.callbacks.beforeSubmit(e, data) === false)) {
                    return;
                }

                data.submit();
            },
            submit (e, data) {
                // console.log(data);
            },
            done (e, data) {
                // console.log(data);
                vm.$dispatch('done', data);
            },
            fail (e, data) {
                // console.log(data);
                vm.$dispatch('failed', {data, msg: '上传失败'});
            }
        };

        input.fileupload(options);

        return true;
    };

    export default {
        data: () => ({
            elInput: null // 当前file input的dom元素
        }),
        /**
         * @property {String} url 文件上传地址
         * @property {String} [type=link] 按钮类型，支持 'link' / 'button'
         * @property {Array} [fileType=[]] 支持的所有文件类型，如 ['.txt', '.pdf']
         * @property {String} [text=选择文件] 按钮文字
         * @property {Object} [callbacks] 各种回调事件
         * @property {Function} [callbacks.beforeSubmit] 提交之前的处理，若显式返回false则不提交
         */
        props: {
            url: String,
            type: {
                type: String,
                default: 'link'
            },
            fileType: {
                type: Array,
                default: []
            },
            text: {
                type: String,
                default: '选择文件'
            },
            callbacks: Object,

        },
        ready () {
            this.elInput = this.type === 'link' ? this.$els.linkfile : this.$els.buttonfile;
            _init.call(this);
        },
        beforeDestroy () {
            $(this.elInput).fileupload('destroy');
        }
    };
</script>

<style scoped>
    .bh-uploader {
        line-height: 28px;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }

    .file-input {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
        font-size: 200px !important;
        direction: ltr;
        cursor: pointer;
    }
</style>
