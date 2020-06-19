<template>
  <div id="coach-course">
    <!--驾校课程-->
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>教练课程</span>
        <el-button style="float: right;" type="primary" @click="addCoachCourse()">
          新增
        </el-button>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="form_Data" max-height="100%">
          <el-table-column label="班型名称">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolCourse.schoolCourseName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="驾照类型">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolCourse.schoolCourseType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学车周期(天)">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolCourse.learnCycle }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolCourse.schoolCoursePrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.coachCourseId"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.coachCourseId].doClose()">取消
                  </el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteCoachCourse(scope.row.coachCourseId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getCoachCourseList"></pagination>
      </div>
      <el-dialog title=" 新增教练课程" width="600px" append-to-body @close="cancelCourse" :close-on-click-modal="false"
                 :visible.sync="dialogTableVisible">
        <el-form label-width="120px">
          <el-form-item label="班型名称:">
            <el-select v-model="form_c.schoolCourseId" placeholder="请选择班型">
              <el-option
                      v-for="item in courseOptions"
                      :key="item.schoolCourseId"
                      :label="item.schoolCourseName"
                      :value="item.schoolCourseId">
                <span style="float: left">{{ item.schoolCourseName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.schoolCourseType }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height: 200px;"></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm_c('form_c')" :loading="form_c_btn">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    getCoachCourseListApi,
    deleteCoachCourseApi,
    getSchoolCourseListApi,
    addCoachCourseApi
  } from "@/api/coach"
  import pagination from '@/components/pagination'

  export default {
    name: "CoachCourse",
    components: {pagination},
    props: {
      coachId: {
        type: Number,
        default: () => 0
      },
      schoolId: {
        type: Number,
        default: () => 0
      }
    },
    data() {
      return {
        /*教练课程*/
        dialogTableVisible: false,
        schoolCourseId: Number,
        coachCourseId: Number,
        form_c_btn: false,
        isLoading: false,
        isLoadingButton: false,
        form_Data: [],
        courseOptions: [],
        form_c: {
          schoolCourseId: null,
          coachId: 0
        },
        courseTypeOptions: [],
      }
    },
    mounted() {
      this.getCoachCourseList();
      getSchoolCourseListApi(this.schoolId).then(result => {
        this.courseOptions = [];
        this.courseOptions = result.data.resultParm.courseList;
      })
    },
    methods: {
      // 获取教练课程
      getCoachCourseList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&coachId=${this.coachId}`;
        getCoachCourseListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.courseList;
          this.form_Data = response.list;
          pagination.total = response.total;
        })
      },
      
      // 新增教练课程
      addCoachCourse() {
        this.form_c.coachId = this.coachId;
        this.dialogTableVisible = true;
      },

      // 提交教练课程表单
      submitForm_c() {
        if (!this.form_c.schoolCourseId) {
          this.$warnMsg('请选择课程');
          return
        }
        this.form_c_btn = true;
        let data = {...this.form_c};
        addCoachCourseApi(data).then(() => {
          this.form_c_btn = false;
          this.getCoachCourseList();
          this.cancelCourse();
        }).catch(() => {
          this.form_c.schoolCourseId = null;
          this.form_c_btn = false;
        })
      },

      // 删除教练课程
      deleteCoachCourse(id) {
        this.isLoadingButton = true;
        deleteCoachCourseApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getCoachCourseList();
            })
            .catch(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose()
            })
      },

      // 关闭添加教练课程信息
      cancelCourse() {
        this.form_c.schoolCourseId = null;
        this.dialogTableVisible = false;
      },
    }
  }
</script>

<style lang="scss">
  .coach-course {

  }
</style>
