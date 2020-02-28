<template>
  <div>
    <!--驾校课程-->
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>驾校课程</span>
        <el-button style="float: right;" type="primary" @click="addSchoolCourse()">
          新增
        </el-button>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="form_Data" max-height="100%">
          <el-table-column
            prop="schoolCourseName"
            label="班型名称">
          </el-table-column>
          <el-table-column
            prop="schoolCourseType"
            label="驾照类型">
          </el-table-column>
          <el-table-column
            prop="schoolCoursePrice"
            label="费用">
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="primary" class="el-icon-edit" @click="editSchoolCourse(scope.row)"
                         size="mini"></el-button>
              <el-popover
                :ref="scope.row.schoolCourseId"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.schoolCourseId].doClose()">取消
                  </el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteCourse(scope.row.schoolCourseId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getDrivingTypeList"></pagination>
      </div>
    </el-card>

    <!--驾校课程添加框-->
    <el-dialog :title="title" width="600px" append-to-body @close="cancelCourse" :close-on-click-modal="false"
               :visible.sync="dialogTableVisible">
      <el-form :model="form_c" :rules="form_c_rules" ref="form_c" label-width="120px" hide-required-asterisk>
        <el-form-item label="班型名称:" placeholder="请输入班型名称" prop="schoolCourseName">
          <el-input v-model="form_c.schoolCourseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="驾照类型:">
          <el-select v-model="form_c.schoolCourseType" placeholder="请选择驾照类型">
            <el-option
              v-for="item in courseTypeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用:" prop="schoolCoursePrice">
          <el-input-number v-model="form_c.schoolCoursePrice" :min="1" :max="99999" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm_c('form_c')" :isloading="form_c_btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/pagination'
  import {
    getDrivingTypeListApi,
    getSchoolCourseListApi,
    addSchoolCourseApi,
    updateSchoolCourseApi,
    deleteSchoolCourseApi
  } from "@/api/school";
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {Pagination},
    data() {
      return {
        /*驾校课程*/
        title: '',
        dialogTableVisible: false,
        schoolCourseId: Number,
        form_c_btn: false,
        isLoading: false,
        isLoadingButton: false,
        form_Data: [],
        form_c: {
          schoolCourseName: '',
          schoolCourseType: 'A1',
          schoolCoursePrice: 1
        },
        courseTypeOptions: [],
        form_c_rules: {
          schoolCourseName: {required: true, message: ' ', trigger: 'blur'},
          schoolCoursePrice: {type: 'number', required: true, message: ' ', trigger: 'change'},

        }
      }
    },
    computed: {
      schoolId() {
        return this.$store.getters.schoolId
      }
    },
    mounted() {
      this.getDrivingTypeList();
      this.getSchoolCourseList();
    },
    methods: {
      // 获得驾校课程类型
      getDrivingTypeList() {
        getDrivingTypeListApi().then(result => {
          this.courseTypeOptions = result.data.resultParm.drivingTypeList
        })
      },

      // 获得驾校课程
      getSchoolCourseList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${this.schoolId}`;
        getSchoolCourseListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.schoolCourseList;
          this.form_Data = response.records;
          pagination.total = response.total;
        })
      },

      // 添加学校课程
      addSchoolCourse() {
        this.title = '添加课程';
        this.dialogTableVisible = true;
      },

      // 提交
      submitForm_c(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form_c};
            data.schoolId = this.schoolId;
            if (this.title === '添加课程') {
              this.form_c_btn = true;
              addSchoolCourseApi(data).then(() => {
                this.form_c_btn = false;
                this.getSchoolCourseList(this.schoolId);
                this.cancelCourse()
              }).catch(() => {
                this.form_c_btn = false;
              })
            } else {
              data.schoolCourseId = this.schoolCourseId;
              updateSchoolCourseApi(data).then(() => {
                this.form_c_btn = false;
                this.getSchoolCourseList(this.schoolId);
                this.cancelCourse()
              }).catch(() => {
                this.form_c_btn = false;
              })
            }
          } else {
            return false;
          }
        });
      },

      // 编辑
      editSchoolCourse(data) {
        this.title = '编辑课程';
        this.dialogTableVisible = true;
        this.schoolCourseId = data.schoolCourseId;
        objectEvaluate(data, this.form_c)
      },

      // 删除课程
      deleteCourse(id) {
        this.isLoadingButton = true;
        deleteSchoolCourseApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getSchoolCourseList(this.schoolId)
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
          })
      },

      // 关闭课程表单
      cancelCourse() {
        this.dialogTableVisible = false;
        this.$refs['form_c'].resetFields();
        this.form_c.schoolCourseName = '';
        this.form_c.schoolCourseType = 'A1';
        this.form_c.schoolCoursePrice = 1
      }
    }
  }
</script>

<style scoped>

</style>
