<template>
  <div>
    <textarea class="custom-editor"></textarea>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver'

  import 'tinymce/icons/default/icons.min.js'
  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/link' //超链接插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/contextmenu'  //右键菜单插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/colorpicker' //选择颜色插件
  import 'tinymce/plugins/textcolor'  //文本颜色插件
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help' // 帮助
  import 'tinymce/plugins/charmap' // 特殊符号
  import 'tinymce/plugins/paste' // 粘贴图片
  import 'tinymce/plugins/hr' // 水平分割线
  import 'tinymce/plugins/searchreplace' // 全屏
  import 'tinymce/plugins/insertdatetime' // 插入时间
  import 'tinymce/plugins/toc' // 内容列表
  import 'tinymce/plugins/codesample' // 插入代码

  import {uploadArticleContentPictureApi} from '@/api/article'

  export default {
    name: "CustomEditor",
    props: {
      editorKey: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        content: "",
        DefaultInit: {
          language_url: '/assets/tinymce/langs/zh_CN.js',  //导入语言文件
          language: "zh_CN",//语言设置
          skin_url: '/assets/tinymce/skins/ui/oxide',//主题样式
          height: 1000, //高度
          menubar: false, // 最上方menu菜单
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: false, // 隐藏编辑器底部的状态栏
          elementpath: false,  // 禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          toolbar: ['bold italic underline strikethrough blockquote | forecolor backcolor|formatselect | fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent |codeformat blockformats | removeformat undo redo ',
            'bullist numlist toc pastetext|charmap hr insertdatetime | lists image media table link unlink | searchreplace fullscreen'],
          plugins: 'lists image media table wordcount fullscreen help codesample toc insertdatetime  searchreplace  link charmap paste hr',
        }
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        tinymce.init({
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: (blobInfo, success) => {
            let data = {};
            data.file = blobInfo.blob();
            uploadArticleContentPictureApi(data)
              .then(result => {
                let url = process.env.VUE_APP_BASE_URL + result.data.resultParm.message;
                success(url)
              })
          },
          // 挂载的DOM对象
          selector: `.custom-editor`
        });
      },
      // 获得富文本内容
      get() {
        return tinymce.editors[this.editorKey].getContent()
      },
      // 设置富文本内容
      set(value = "") {
        tinymce.editors[this.editorKey].setContent(value)
      }
    },
    // 退出销毁
    beforeDestroy() {
      let list = document.querySelectorAll('.custom-editor');
      list.forEach(item => {
        item.style.visibility = 'hidden'
      });
      tinymce.remove();
    }
  };
</script>
