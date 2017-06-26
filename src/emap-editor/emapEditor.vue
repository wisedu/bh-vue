<template>
    <div class='emap-editor'>
        <div v-el:editor></div>
        <div v-el:imgpanel v-if='bShowImgPanel' class='img-panel'>
            <bh-uploader v-ref:uploader :url='options.imgUrl' :file-type='imgTypes' @done='imgDone' @failed='imgFailed' @etype='imgTypeError'></bh-uploader>
        </div>
    </div>
</template>

<script>
    /**
     * 富文本编辑器 【 基于 summernote 实现 】
     * @module EmapEditor
     *
     * @example
     *     <caption>html</caption>
     *     <emap-editor :options='options'></emap-editor>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         data: function() {
     *             return {
     *                 options: {
     *                     contextPath: 'mock'
     *                 }
     *             }
     *         },
     *         ready: function() {
     *         },
     *         components: {EmapEditor}
     *    }
     */

    import BhUploader from 'bh-vue/bh-uploader/bhUploader'

    const DEFAULT_OPTS = {
        height: 200,
        disableDragAndDrop: true,
        fullFilePath: false, // 保存文件和 图片的 绝对路径
        popover: {
            air: [
                ['color', ['color']],
                ['font', ['bold', 'underline', 'clear']]
            ]
        },
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'italic', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'uploadImage', 'hr']],
            ['view', ['codeview']]
        ],
        fontNames: ['SimHei', 'SimSun', 'KaiTi', 'Microsoft YaHei', 'Arial', 'Arial Black', 'Helvetica', 'Comic Sans MS', 'Courier New'],
        lang: 'zh-CN'
    };

    export default {
        /**
         * @property {Object} options 初始化参数配置，更多参数请参照官方文档（http://summernote.org/deep-dive/#initialization-options）
         * @property {String} [options.imgUrl] 图片上传路径
         * @property {String} [options.imgDownload] 图片下载路径
         */
        data: () => ({
            bShowImgPanel: false,
            imgTypes: ['.png', 'jpg', 'jpeg']
        }),
        props: {
            options: Object
        },
        methods: {
            /**
             * 获取编辑器内容
             * @return {String} 编辑器内容
             */
            getValue () {
                return this.wrapper().summernote('code');
            },
            /**
             * 设置编辑器内容
             * @param {String} text 要设置的编辑器内容
             */
            setValue (text) {
                this.wrapper().summernote('code', text);
            },
            /**
             * 启用
             */
            enable () {
                this.wrapper().summernote('enable');
            },
            /**
             * 禁用
             */
            disable () {
                this.wrapper().summernote('disable');
            },
            /**
             * 清空
             */
            clear () {
                this.wrapper().summernote('reset');
            },
            /**
             * 内容是否为空
             * @return {Boolean} 为空则返回true，否则返回false
             */
            isEmpty () {
                return this.wrapper().summernote('isEmpty');
            },
            wrapper() {
                return $(this.$els.editor);
            },
            uploadImage (context) {
                if (!this.options.imgDownload) {
                    console.warn('图片下载路径未指定');
                    return;
                }

                let self = this
                var ui = $.summernote.ui;

                // create button
                var button = ui.button({
                    contents: '<i class="iconfont icon-image" style="line-height: 12px;font-size: 14px;" />',
                    tooltip: 'uploadImage',
                    click: function () {
                        self.bShowImgPanel = true
                        self.$nextTick(() => self.$refs.uploader.triggerClick())
                    }
                });

                return button.render();
            },
            imgDone (data) { // 图片上传成功
                console.log(data)
                let options = this.options;
                let result = data.result;
                let fileId = result && result.id;
                let fileName = data && data.files && data.files[0].name;

                if (fileId) {
                    let wrapper = this.wrapper();
                    let url = `${options.imgDownload}/${fileId}`;
                    wrapper.summernote('insertImage', url, fileName);
                }

                this.bShowImgPanel = false
            },
            imgFailed () {
                this.$dispatch('imgerror');
                this.bShowImgPanel = false
            },
            imgTypeError () {
                this.$dispatch('imgtypeerror');
                this.bShowImgPanel = false
            }
        },
        ready () {
            let wrapper = this.wrapper()
            wrapper.summernote($.extend({}, DEFAULT_OPTS, this.options, {
                callbacks: {
                    onImageUpload (files) {
                        console.log(files)
                    }
                },
                buttons: {
                    uploadImage: this.uploadImage.bind(this)
                }
            }));
            wrapper.summernote('fontName', 'Microsoft YaHei');
        },
        beforeDestroy () {
            // alert('destroy')
            this.wrapper().summernote('destroy');
            // alert('after destroy')
        },
        components: {BhUploader}
    };
</script>

<style scoped>
    /* .note-editor.panel-default > .panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
    }
    .note-editor .panel-heading {
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    */
    .img-panel {
        position: absolute;
        width: 0;
        overflow: hidden;
    }
</style>
