<template>
  <el-upload
      v-loading="isLoading"
      element-loading-background="rgba(255, 255, 255, 0)"
      ref="ImageUploader"
      class="image-uploader"
      action="image-upload"
      :accept="accept"
      :http-request="uploadFile"
      :show-file-list="false">
    <img v-if="url" :src="url" class="custom-image" alt="图片"/>
    <img v-else-if="value" :src="baseUrl + value" class="custom-image" alt="图片"/>
    <i v-else class="el-icon-plus image-uploader-icon"></i>
  </el-upload>
</template>

<script>
  // import {uploadPicturePlusApi} from "@/api/file";

  export default {
    name: "ImageUploader",
    props: {
      value: {
        type: String,
        default: ""
      },
      typePath: {
        type: String,
        default: 'image'
      }
    },
    data() {
      return {
        isLoading: false,
        accept: ".jpg, .png",
        url: ""
      };
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      }
    },
    watch: {
      value(val) {
        if (!val) this.clearFiles()
      }
    },
    methods: {
      /* 自定义上传 */
      uploadFile(param) {
        const {file} = param;
        const type = file.name
          .substring(file.name.lastIndexOf(".") + 1)
          .toLowerCase();
        const size = file.size / 1024 / 1024;
        if (!this.accept.includes(type)) {
          let accept = this.accept.replace(/[.]|[,]/g, "");
          this.$errorMsg(`上传视屏封面只能是 ${accept} 格式!`);
          return;
        }
        if (size > 2) {
          this.$errorMsg("上传视屏封面大小不能超过 2MB!");
          return;
        }
        this.isLoading = true;
        let data = {};
        data.file = file;
        data.typePath = this.typePath;
        uploadPicturePlusApi(data)
          .then(result => {
            this.isLoading = false;
            this.$emit("input", result.resultParam.uploadFilePath);
            this.$parent.$emit('el.form.change');
            this.url = URL.createObjectURL(file);
          })
          .catch(() => {
            this.isLoading = false;
          });
      },
      // 清理文件
      clearFiles() {
        this.url = "";
        this.isLoading = false;
        this.$refs.ImageUploader.clearFiles();
      },
    }
  };
</script>

<style lang="scss">
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .custom-image {
    width: 178px;
    height: 178px;
    display: block;
  }

  .image-uploader {
    .el-loading-mask {
      width: 168px;
      height: 168px;
      margin: 5px;
    }
  }
</style>
