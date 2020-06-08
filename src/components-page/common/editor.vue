<template>
  <!--富文本编辑器-->
  <div class="editor-wrapper">
    <div :id="name" style="text-align:left"></div>
    <!--<div style="padding: 5px 0; color: #ccc">中间隔离带</div>-->
    <div :id="name+'2'" class="text" :style="{'min-height': height+'px'}"> <!--可使用 min-height 实现编辑区域自动增加高度-->
    </div>
  </div>
  <!--引入该组件 的使用方法-->
  <!--<editor :height="300" :name="form.editorName" :value="form.answer"
          v-model="form.answer"
          @change="function(html){form.answer=html}">
  </editor>-->
</template>

<script>
  import Editor from 'wangeditor'

  export default {
    name: 'editor',
    props: {
      'name': {},
      'value': {},
      'height': {
        default: 132
      },
      //上传地址
      'uploadUrl': {}
    },
    data () {
      return {
        editorObj: null
      }
    },
    mounted () {
      // 实例化Editor对象
      this.editorObj = new Editor('#' + this.name, '#' + this.name + '2')
      // console.log(this.name+'2');
      // 编辑器内容改变时，触发父组件change事件
      this.editorObj.customConfig.onchange = (html) => {
        this.$emit('change', html)
      }
      // 设置富文本编辑器的z-index值
      this.editorObj.customConfig.zIndex = 1000

      // this.editorObj.customConfig.headers = localStorage.getItem(setting.userToken)

      // 设置图片上传的服务器地址
      this.editorObj.customConfig.uploadImgServer = setting.remoteHost + this.uploadUrl

      this.editorObj.customConfig.uploadImgHeaders = {
        'Authorization': localStorage.getItem(setting.userToken)
      }
      // console.log(localStorage.getItem(setting.userToken))
      // 隐藏“网络图片”tab
      this.editorObj.customConfig.showLinkImg = false
      // 将图片大小限制为 16M
      this.editorObj.customConfig.uploadImgMaxSize = 16 * 1024 * 1024
      // 限制一次最多上传 10 张图片
      this.editorObj.customConfig.uploadImgMaxLength = 10
      // 图片参数name
      this.editorObj.customConfig.uploadFileName = 'file'
      // 创建富文本编辑器
      // 自定义菜单配置
      this.editorObj.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      //图片回来的回调
      this.editorObj.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          var url = setting.remoteHost + '/' + result
          // console.log(url)
          insertImg(url)
        }
      }

      this.editorObj.create()
      // 设置初始内容
      this.changeHtml(this.value)
      //

    },
    methods: {
      changeHtml (val) {
        this.editorObj.txt.html(val)
      }
    }
  }
</script>

<style lang="less">
  .editor-wrapper {
    background-color: #f5f5f5;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;

    .toolbar {
      border: 1px solid #ccc;
    }

    .text {
      border: 1px solid #ccc;
      height: 132px;
    }

    .w-e-toolbar {
      background-color: #f1f1f1 !important;
      border-radius: 4px 4px 0 0 !important;
      border: 1px solid #dcdfe6 !important;
      border-bottom: none !important;
      flex-wrap: wrap;
      padding: 4px 8px 6px;

      .w-e-menu {
        height: 28px;

        i {
          color: #979797;
        }
      }
    }

    .w-e-text-container {
      border: 1px solid #dcdfe6 !important;
      border-top: none !important;
      border-radius: 0 0 4px 4px;
      overflow: hidden;
      background-color: #fff;

      .w-e-text {
        width: 104% !important;
        padding: 0 5px;
      }
    }

    .w-e-toolbar .w-e-menu {
      padding: 0px 8px !important;
    }

    .text {
      border: 1px solid #ccc;
      height: 132px;
    }
  }
</style>
