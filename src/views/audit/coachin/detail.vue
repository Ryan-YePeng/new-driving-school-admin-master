<template>
  <div id="coachInDetail">
    <el-dialog
        title="教练入驻信息详情"
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
        <el-form-item label="性别:">
          <span>{{form.coachGender}}</span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span>{{form.username}}</span>
        </el-form-item>
        <el-form-item label="身份证号:">
          <span>{{form.idNumber}}</span>
        </el-form-item>
        <el-form-item label="位置:">
          <span>{{form.position}}</span>
        </el-form-item>
        <el-form-item label="身份证:">
          <div v-for="item in idImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="idImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="教练证:">
          <div v-for="item in coachCardImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="coachCardImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="教练车:">
          <div v-for="item in coachCarImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="coachCarImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="行驶证:">
          <div v-for="item in drivingPermitImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="drivingPermitImage" style="width: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="驾驶证:">
          <div v-for="item in drivingLicenseImage" style="float: left;margin-right: 20px">
            <el-image :src="item" :preview-src-list="drivingLicenseImage" style="width: 300px;">
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
  export default {
    name: "CoachInDetail",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          realName: '',
          coachGender: '',
          username: '',
          idNumber: '',
          position: '',
          idPicture: '',
          coachCardPicture: '',
          coachCarPicture: '',
          drivingPermitPicture: '',
          drivingLicensePicture: '',
        },
        idImage: [],
        coachCardImage: [],
        coachCarImage: [],
        drivingPermitImage: [],
        drivingLicenseImage: [],
      }
    },
    watch: {
      'form.idPicture': function (value) {
        if (value) this.idImage = this.transform(value);
        else this.idImage = []
      },
      'form.coachCardPicture': function (value) {
        if (value) this.coachCardImage = this.transform(value);
        else this.coachCardImage = []
      },
      'form.coachCarPicture': function (value) {
        if (value) this.coachCarImage = this.transform(value);
        else this.coachCarImage = []
      },
      'form.drivingPermitPicture': function (value) {
        if (value) this.drivingPermitImage = this.transform(value);
        else this.drivingPermitImage = []
      },
      'form.drivingLicensePicture': function (value) {
        if (value) this.drivingLicenseImage = this.transform(value);
        else this.drivingLicenseImage = []
      }
    },
    methods: {
      transform(str) {
        let baseUrl = process.env.VUE_APP_BASE_API;
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
  #coachInDetail {
    .el-icon-picture-outline:before {
      font-size: 125px;
    }
  }
</style>
