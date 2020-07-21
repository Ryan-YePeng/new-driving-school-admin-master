<template>
  <div>
    <div v-show="isShow">
      <card>
        <div slot="header">
          <el-input placeholder="搜索驾校名" v-model="schoolFullNameText" clearable style="width: 180px"
                    @keyup.enter.native="getSchoolList"></el-input>
          <region-select
              :province.sync="provinceNameText"
              :city.sync="cityNameText"
              :area.sync="areaNameText"
              placeholder="搜索位置"
              :check-strictly="true"
          />
          <el-button type="success" class="el-icon-search" @click="getSchoolList">搜索</el-button>
          <el-button style="float: right" type="primary" @click="add">新增</el-button>
        </div>
        <el-table v-loading="isLoading" :data="schoolData" max-height="100%" style="width: 100%">
          <el-table-column
              prop="schoolFullName"
              label="驾校全称"
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              prop="schoolNature"
              label="驾校性质">
          </el-table-column>
          <el-table-column
              prop="address"
              label="详细地址" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="联系电话" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              prop="realName"
              label="联系人">
          </el-table-column>
          <el-table-column
              prop="username"
              label="注册号码"
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              prop="score"
              label="评分">
          </el-table-column>
          <el-table-column label="是否推荐">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isRecommend"
                         @change="recommend(scope.row.schoolId,scope.row.isRecommend)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="是否支付">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isPay"
                         @change="pay(scope.row.schoolId,scope.row.isPay)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="是否显示咨询">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isShowForm"
                         @change="changeShowForm(scope.row.schoolId,scope.row.isShowForm)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row)" size="mini" class="el-icon-zoom-in"></el-button>
              <el-popover
                  :ref="scope.row.schoolId"
                  placement="top"
                  width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.schoolId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteSchool(scope.row.schoolId)">确认
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini" @click.stop class="el-icon-delete"></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getSchoolList"></pagination>
      </card>
    </div>
    <div v-show="!isShow && flag==='edit'">
      <school-detail ref="SchoolDetail" @tab="tab" @update="getSchoolList"></school-detail>
    </div>
    <div v-if="!isShow && flag==='add'">
      <add-school ref="AddSchool" @tab="tab" @update="getSchoolList"></add-school>
    </div>
  </div>
</template>

<script>
  import SchoolDetail from './detail'
  import AddSchool from './add'
  import RegionSelect from '@/components/RegionSelect'
  import {
    getSchoolListApi,
    deleteSchoolApi,
    schoolDisRecommendApi,
    schoolRecommendApi,
    updateSchoolApi
  } from "@/api/school";

  import Pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {Pagination, SchoolDetail, AddSchool, RegionSelect},
    data() {
      return {
        flag: '',
        isShow: true,
        schoolData: [],
        isLoading: false,
        isLoadingButton: false,
        schoolFullNameText: '',
        provinceNameText: '',
        cityNameText: '',
        areaNameText: ''
      }
    },
    mounted() {
      this.getSchoolList();
    },
    methods: {
      // 切换
      tab() {
        this.isShow = !this.isShow
      },
      // 获取列表
      getSchoolList() {
        this.flag = 'edit';
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolFullName=${this.schoolFullNameText}&provinceName=${this.provinceNameText}&cityName=${this.cityNameText}&areaName=${this.areaNameText}&isRecommend=`;
        getSchoolListApi(param).then(result => {
          let response = result.data.resultParm.schoolList;
          this.schoolData = response.records;
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        });
      },
      // 删除驾校
      deleteSchool(id) {
        this.isLoadingButton = true;
        deleteSchoolApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getSchoolList()
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
          })
      },
      // 是否显示咨询
      changeShowForm(id, flag) {
        let data = {
          isShowForm: flag,
          schoolId: id
        };
        updateSchoolApi(data).then(() => {
          this.getSchoolList()
        })
      },
      // 是否推荐驾校
      recommend(id, flag) {
        if (flag) {
          schoolRecommendApi(id).then(() => {
            this.getSchoolList()
          })
        } else {
          schoolDisRecommendApi(id).then(() => {
            this.getSchoolList()
          })
        }
      },
      // 是否支付
      pay(id, flag) {
        let data = {
          schoolId: id,
          isPay: flag
        };
        updateSchoolApi(data).then(() => {
          this.getSchoolList()
        })
      },
      // 修改驾校
      edit(data) {
        try {
          this.flag = 'edit';
          let _this = this.$refs['SchoolDetail'];
          _this.schoolId = data.schoolId;
          /*驾校信息*/
          objectEvaluate(data, _this.form_i);
          /*多张图片*/
          objectEvaluate(data, _this.form_p);
          /*驾校资讯方式*/
          objectEvaluate(data, _this.form_r);
        } finally {
          this.tab()
        }
      },
      // 添加驾校
      add() {
        this.flag = 'add';
        this.tab()
      }
    }
  }
</script>
