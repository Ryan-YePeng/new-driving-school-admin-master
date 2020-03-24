<template>
  <div id="schoolDetail" style="background-color: white;border-radius: 5px;">
    <el-page-header @back="goBack" content="教练列表" style="padding:10px 0"></el-page-header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑教练</span>
        <el-button :loading="isButtonLoading" style="float: right;" type="primary" @click="submitForm()">提交
        </el-button>
      </div>
      <div>

        <!--驾校账户-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>教练账户</span>
          </div>
          <div>
            <el-form :model="form" :rules="rules" ref="form_u" label-width="120px">
              <el-form-item label="账户:" prop="username">
                <el-input v-model="form.username" placeholder="请输入一个手机号作为教练账户"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <!--教练信息-->
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>教练信息</span>
          </div>
          <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" hide-required-asterisk>
              <el-form-item label="教练姓名:" prop="realName">
                <el-input v-model="form.realName" placeholder="请输入教练姓名"></el-input>
              </el-form-item>
              <el-form-item label="教练性别:" prop="coachGender">
                <el-radio v-model="form.coachGender" label="男">男</el-radio>
                <el-radio v-model="form.coachGender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="教练位置:">
                <el-cascader
                        size="mini"
                        style="width: 270px"
                        placeholder="请选择教练位置"
                        :options="optionData"
                        v-model="selectedOptions">
                </el-cascader>
              </el-form-item>
              <el-form-item label="教练所属驾校" prop="schoolId">
                <el-select
                        v-model="form.schoolId"
                        @blur="schoolNameSelected"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入所属驾校"
                        :remote-method="remoteMethod"
                        :loading="searchLoading">
                  <el-option
                          v-for="item in schoolNameOptions"
                          style="width: 300px"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.area }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教练介绍:" prop="coachIntroduce">
                <el-input type="textarea" v-model="form.coachIntroduce" placeholder="请输入教练简介"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <!--教练咨询-->
        <!--        <el-card class="box-card" style="margin-top: 20px">-->
        <!--          <div slot="header" class="clearfix">-->
        <!--            <span>教练咨询</span>-->
        <!--          </div>-->
        <!--          <div>-->
        <!--            <el-form :model="form" :rules="rules" label-width="120px">-->
        <!--              <el-form-item label="咨询方式:" prop="articleTitle">-->
        <!--                <el-radio v-model="form.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>-->
        <!--                <el-radio v-model="form.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>-->
        <!--              </el-form-item>-->
        <!--              <el-form-item v-if="form.isConsult" label="跳转链接:">-->
        <!--                <el-input v-model="form.consultLink" placeholder="请输入跳转链接"></el-input>-->
        <!--              </el-form-item>-->
        <!--            </el-form>-->
        <!--          </div>-->
        <!--        </el-card>-->
      </div>
    </el-card>
  </div>
</template>

<script>
  // 地区选择器
  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'

  import {addCoachApi, getSchoolNameApi} from "@/api/coach"

  import PictureUploader from '@/components/picture-uploader'

  export default {
    components: {PictureUploader},
    data() {
      let validatePhone = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error(" "));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      };
      return {
        isButtonLoading: false,

        /*教练信息*/
        optionData: regionData,
        selectedOptions: [],
        position: '',
        form: {
          schoolId: null,
          realName: '',
          coachGender: '男',
          province: '',
          city: '',
          area: '',
          coachIntroduce: '',
          isConsult: false,
          consultLink: ''
        },
        rules: {
          realName: {required: true, message: ' ', trigger: 'blur'},
          username: [{validator: validatePhone, trigger: "blur"}],
          coachIntroduce: {required: true, message: ' ', trigger: 'blur'}
        },

        /*搜索驾校*/
        searchLoading: false,
        schoolNameOptions: [],

        flag: true
      }
    },

    methods: {
      // 动态获取驾校列表
      schoolNameSelected() {
        setTimeout(() => {
          this.$refs['form'].validateField("schoolId");
        }, 100)
      },

      remoteMethod(query) {
        if (query !== '') {
          this.searchLoading = true;
          getSchoolNameApi(query).then(response => {
            this.searchLoading = false;
            let schoolNameOptionsData = [];
            let areaData;
            for (let i = 0; i < response.data.resultParm.schoolNameList.length; i++) {
              areaData = response.data.resultParm.schoolNameList[i].province + " " + response.data.resultParm.schoolNameList[i].city + " " + response.data.resultParm.schoolNameList[i].area + "";
              schoolNameOptionsData.push({
                value: response.data.resultParm.schoolNameList[i].schoolId,
                label: response.data.resultParm.schoolNameList[i].schoolFullName,
                area: areaData
              })
            }
            this.schoolNameOptions = schoolNameOptionsData;
          }).catch(() => {
            this.searchLoading = false;
          })
        } else {
          this.schoolNameOptions = [];
          this.form.schoolId = null;
        }
      },

      // 提交form
      submitForm() {
        let flag = true;
        this.$refs['form_u'].validateField("username", (valid) => {
          if (!valid) flag = false
        });
        if (flag) return;
        if (this.selectedOptions.length === 0) {
          this.$warnMsg('请选择教练位置');
          return
        }
        let data = {...this.form};
        if (this.selectedOptions.length === 1) {
          data.province = CodeToText[this.selectedOptions[0]];
          data.city = '';
          data.area = ''
        }
        if (this.selectedOptions.length === 2) {
          data.province = CodeToText[this.selectedOptions[0]];
          data.city = CodeToText[this.selectedOptions[1]];
          data.area = ''
        }
        if (this.selectedOptions.length === 3) {
          data.province = CodeToText[this.selectedOptions[0]];
          data.city = CodeToText[this.selectedOptions[1]];
          data.area = CodeToText[this.selectedOptions[2]]
        }
        if (!this.form.schoolId) {
          this.$warnMsg('请选择教练所属驾校');
          return
        }
        if (!this.form.isConsult) {
          data.consultLink = ''
        } else {
          data.consultLink = this.form.consultLink
        }
        data.isConsult = this.form.isConsult;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isButtonLoading = true;
            addCoachApi(data).then(() => {
              this.isButtonLoading = false;
              this.$emit('update');
              this.$emit('tab');
            }).catch(() => {
              this.isButtonLoading = false
            })
          } else {
            return false;
          }
        });
      },

      // 退出
      goBack() {
        this.$msgBox('确认退出？').then(() => {
          this.$emit('update');
          this.$emit('tab');
        })
      }
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
<style lang="scss">
  #schoolDetail {
    .el-textarea__inner {
      height: 160px;
    }
  }
</style>
