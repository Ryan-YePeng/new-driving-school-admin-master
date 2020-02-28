<template>
  <div>
    <div v-show="isShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>驾校列表</span>
          <el-button style="float: right" type="primary" @click="add">新增</el-button>
        </div>
        <div>
          <el-input placeholder="搜索驾校名" v-model="schoolFullNameText" clearable style="width: 180px" size="mini"
                    @keyup.enter.native="getSchoolList"></el-input>
          <el-cascader
            size="mini"
            clearable
            placeholder="搜索位置"
            :props="{ checkStrictly: true }"
            :options="options"
            v-model="selectedOptions">
          </el-cascader>
          <el-button type="success" class="el-icon-search" size="mini" @click="getSchoolList">搜索</el-button>
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
        </div>
      </el-card>
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
  import {
    schoolHeadPictureBaseUrl,
    schoolPictureBaseUrl,
  } from "@/utils/path";
  import {
    getSchoolListApi,
    deleteSchoolApi,
    schoolDisRecommendApi,
    schoolRecommendApi
  } from "@/api/school";

  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'
  import {TextToCode} from 'element-china-area-data'

  import Pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {Pagination, SchoolDetail, AddSchool},
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
        areaNameText: '',
        options: regionData,
        selectedOptions: []
      }
    },
    mounted() {
      this.getSchoolList();
    },
    computed: {
      pictureUrl() {
        return schoolPictureBaseUrl
      }
    },
    watch: {
      selectedOptions: function (array) {
        array = array.map(item => {
          return CodeToText[item]
        });
        let length = array.length;
        if (length === 0) {
          this.provinceNameText = '';
          this.cityNameText = '';
          this.areaNameText = '';
        } else if (length === 1) {
          this.provinceNameText = array[0];
          this.cityNameText = '';
          this.areaNameText = '';
        } else if (length === 2) {
          this.provinceNameText = '';
          this.cityNameText = array[1];
          this.areaNameText = '';
        } else {
          this.provinceNameText = '';
          this.cityNameText = '';
          this.areaNameText = array[2];
        }
      }
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
        let param = `current=${pagination.current}&size=${pagination.size}&schoolFullName=${this.schoolFullNameText}&provinceName=${this.provinceNameText}&cityName=${this.cityNameText}&areaName=${this.areaNameText}`;
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

      // 修改驾校
      edit(data) {
        try {
          this.flag = 'edit';
          let _this = this.$refs['SchoolDetail'];
          _this.schoolId = data.schoolId;
          objectEvaluate(data, _this.form_i);
          _this.selectedOptions = [];
          _this.imageUrl = schoolHeadPictureBaseUrl + data.headPicture;
          if (data.province) _this.selectedOptions.push(TextToCode[data.province].code);
          if (data.city) _this.selectedOptions.push(TextToCode[data.province][data.city].code);
          if (data.area) _this.selectedOptions.push(TextToCode[data.province][data.city][data.area].code);

          /*多张图片*/
          let list = data.trainingPicture.split(',');
          _this.fileList = [];
          list.forEach(item => {
            _this.fileList.push({
              pictureUrl: item,
              url: this.pictureUrl + item
            });
          });

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
