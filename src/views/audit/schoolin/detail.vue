<template>
  <div id="schoolInDetail">
    <el-dialog
      title="驾校入驻信息详情"
      width="80%"
      append-to-body
      @close="cancel"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      :visible.sync="dialogTableVisible">
      <el-form label-width="120px">
        <el-form-item label="真实姓名:">
          <span>{{form.realName}}</span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span>{{form.username}}</span>
        </el-form-item>
        <el-form-item label="驾校性质:">
          <span>{{form.schoolNature}}</span>
        </el-form-item>
        <el-form-item label="驾校全称:" :show-overflow-tooltip="true">
          <span>{{form.schoolFullName}}</span>
        </el-form-item>
        <el-form-item label="驾校简称:"
                      :show-overflow-tooltip="true">
          <span>{{form.schoolShortName}}</span>
        </el-form-item>
        <el-form-item label="位置:" :show-overflow-tooltip="true">
          <span>{{form.position}}</span>
        </el-form-item>
        <el-form-item label="身份证照片:">
          <div v-for="item in idImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="idImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="营业执照:">
          <div v-for="item in businessLicenseImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="businessLicenseImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="授权说明:">
          <div v-for="item in authorizedImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="authorizedImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="训练场照片:">
          <div v-for="item in trainingImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="trainingImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="门店照片:">
          <div v-for="item in facadeImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="facadeImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {coachInPictureBaseUrl} from "@/utils/path";

  export default {
    name: "SchoolInDetail",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          realName: '',
          username: '',
          schoolNature: '',
          schoolFullName: '',
          schoolShortName: '',
          position: '',
          idPicture: '',
          businessLicensePicture: '',
          authorizedPicture: '',
          trainingPicture: '',
          facadePicture: '',
        },
        idImage: [],
        businessLicenseImage: [],
        authorizedImage: [],
        trainingImage: [],
        facadeImage: [],
      }
    },
    watch: {
      'form.idPicture': function (value) {
        if (value) this.idImage = this.transform(value);
        else this.idImage = []
      },
      'form.businessLicensePicture': function (value) {
        if (value) this.businessLicenseImage = this.transform(value);
        else this.businessLicenseImage = []
      },
      'form.authorizedPicture': function (value) {
        if (value) this.authorizedImage = this.transform(value);
        else this.authorizedImage = []
      },
      'form.trainingPicture': function (value) {
        if (value) this.trainingImage = this.transform(value);
        else this.trainingImage = []
      },
      'form.facadePicture': function (value) {
        if (value) this.facadeImage = this.transform(value);
        else this.facadeImage = []
      }
    },
    methods: {
      transform(str) {
        let baseUrl = coachInPictureBaseUrl;
        let array = str.split(',');
        array = array.map(item => {
          return baseUrl + item
        });
        return array
      },
      cancel() {
        for (let key in this.form) {
          this.form[key] = ''
        }
      }
    },

  }
</script>

<style lang="scss">
  #schoolInDetail {
    .el-icon-picture-outline:before {
      font-size: 125px;
    }
  }
</style>
