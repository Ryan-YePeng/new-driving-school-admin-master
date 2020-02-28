<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :md="8">
        <el-card class="box-card" style="margin-bottom: 20px">
          <div slot="header" class="clearfix">
            <span>一级地区</span>
            <el-button style="float: right" type="primary" size="mini" class="el-icon-plus"
                       @click="addPlaceProvince"></el-button>
          </div>
          <div>
            <el-table
              v-loading="isProvinceLoading"
              :data="provinceList"
              :highlight-current-row="true"
              @row-click="provinceCurrentChange"
              max-height="100%"
              size="mini"
              style="width: 100%">
              <el-table-column
                prop="provinceName"
                label="位置">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" class="el-icon-plus" @click.stop="addPlaceCity(scope.row)"
                             size="mini"></el-button>
                  <el-popover
                    :ref="scope.row.provinceName"
                    placement="top"
                    width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="$refs[scope.row.provinceName].doClose()">取消</el-button>
                      <el-button :loading="isProvinceButton" type="primary" size="mini"
                                 @click.stop="deleteProvince(scope.row.provinceName, scope.row.provinceId)">确定
                      </el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card class="box-card" style="margin-bottom: 20px">
          <div slot="header" class="clearfix">
            <span>二级地区</span>
            <div style="height: 12px"></div>
          </div>
          <div>
            <el-table
              :data="cityList"
              v-loading="isCityLoading"
              :highlight-current-row="true"
              @row-click="cityCurrentChange"
              max-height="100%"
              size="mini"
              style="width: 100%">
              <el-table-column
                prop="cityName"
                label="位置">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" class="el-icon-plus" @click.stop="addPlaceArea(scope.row)"
                             size="mini"></el-button>
                  <el-popover
                    :ref="scope.row.cityName"
                    placement="top"
                    width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="$refs[scope.row.cityName].doClose()">取消</el-button>
                      <el-button :loading="isCityButton" type="primary" size="mini"
                                 @click.stop="deleteCity(scope.row.cityName, scope.row.cityId)">确定
                      </el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>三级地区</span>
            <div style="height: 12px"></div>
          </div>
          <div>
            <el-table
              :data="areaList"
              v-loading="isAreaLoading"
              :highlight-current-row="true"
              max-height="100%"
              size="mini"
              style="width: 100%">
              <el-table-column
                prop="areaName"
                label="位置">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-popover
                    :ref="scope.row.areaName"
                    placement="top"
                    width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="$refs[scope.row.areaName].doClose()">取消</el-button>
                      <el-button :loading="isCityButton" type="primary" size="mini"
                                 @click.stop="deleteArea(scope.row.areaName, scope.row.areaId)">确定
                      </el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="添加位置"
      width="600px"
      append-to-body
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="dialogTableVisible">
      <div style="height: 270px">
        <el-form label-width="120px" :rules="rules" :model="form" ref="Form" hide-required-asterisk>
          <el-form-item label="位置:" prop="location">
            <el-select v-model="form.location" placeholder="请选择位置">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Form')" :loading="isButtonLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addPlaceAreaApi,
    addPlaceCityApi,
    addPlaceProvinceApi,
    deletePlaceAreaApi,
    deletePlaceCityApi,
    deletePlaceProvinceApi,
    getAreaListApi,
    getCityListApi,
    getProvinceListApi
  } from '@/api/position'
  import {regionData} from 'element-china-area-data'

  export default {
    data() {
      return {
        provinceList: [],
        cityList: [],
        areaList: [],
        isButtonLoading: false,
        isProvinceButton: false,
        isCityButton: false,
        isAreaButton: false,

        isProvinceLoading: false,
        isCityLoading: false,
        isAreaLoading: false,

        optionLoading: false,

        dialogTableVisible: false,
        form: {
          location: ''
        },
        options: [],
        active: '',
        currentClick: '',
        provinceId: Number,
        provinceName: '',
        cityId: Number,

        rules: {
          location: [
            {required: true, message: '请选择地区', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      this.getProvinceList()
    },
    methods: {
      /*关闭*/
      cancel() {
        this.options = [];
        this.active = '';
        this.$refs['Form'].resetFields();
        this.form.location = '';
        this.isButtonLoading = false;
        this.dialogTableVisible = false;
      },
      /*获取省*/
      getProvinceList() {
        this.isProvinceLoading = true;
        getProvinceListApi().then(result => {
          this.isProvinceLoading = false;
          this.provinceList = result.data.resultParm.provinceList;
        }).catch(() => {
          this.isProvinceLoading = false;
        })
      },
      /*删除省*/
      deleteProvince(provinceName, id) {
        this.isProvinceButton = true;
        deletePlaceProvinceApi(id)
          .then(() => {
            this.isProvinceButton = false;
            this.$refs[provinceName].doClose();
            this.getProvinceList()
          })
          .catch(() => {
            this.isProvinceButton = false
          })
      },
      /*添加省*/
      addPlaceProvince() {
        let list = [];
        regionData.forEach(item => {
          let isExist = false;
          this.provinceList.some(obj => {
            if (obj.provinceName === item.label) {
              isExist = true;
              return true
            }
          });
          if (!isExist) list.push(item)
        });
        this.options = list;
        this.active = 'first';
        this.dialogTableVisible = true;
      },
      /*点击省*/
      provinceCurrentChange(data) {
        this.provinceId = data.provinceId;
        this.areaList = [];
        this.provinceName = data.provinceName;
        this.getCityList()
      },
      /*添加市*/
      addPlaceCity(data) {
        this.optionLoading = true;
        getCityListApi(data.provinceId).then(result => {
          this.cityList = result.data.resultParm.cityList;
          let array = [];
          regionData.some(item => {
            if (item.label === data.provinceName) {
              array = item.children;
              return true
            }
          });

          let list = [];
          array.forEach(item => {
            let isExist = false;
            this.cityList.some(obj => {
              if (obj.cityName === item.label) {
                isExist = true;
                return true
              }
            });
            if (!isExist) list.push(item)
          });
          this.options = list;
          this.optionLoading = false;
        });

        this.provinceId = data.provinceId;
        this.active = 'second';
        this.dialogTableVisible = true;
      },
      /*获得市*/
      getCityList() {
        this.isCityLoading = true;
        getCityListApi(this.provinceId).then(result => {
          this.cityList = result.data.resultParm.cityList;
          this.isCityLoading = false
        }).catch(() => {
          this.isCityLoading = false
        })
      },
      /*删除市*/
      deleteCity(cityName, id) {
        this.isCityButton = true;
        deletePlaceCityApi(id)
          .then(() => {
            this.isCityButton = false;
            this.$refs[cityName].doClose();
            this.getCityList()
          })
          .catch(() => {
            this.isCityButton = false;
          })
      },
      /*点击市*/
      cityCurrentChange(data) {
        this.cityId = data.cityId;
        this.getAreaList()
      },
      /*添加区*/
      addPlaceArea(data) {
        this.optionLoading = true;
        getAreaListApi(data.cityId).then(result => {
          this.areaList = result.data.resultParm.areaList;
          let array = [];
          regionData.some(item => {
            if (item.label === this.provinceName) {
              item.children.some(obj => {
                if (obj.label === data.cityName) {
                  array = obj.children;
                  return true
                }
              });
              return true
            }
          });

          let list = [];
          array.forEach(item => {
            let isExist = false;
            this.areaList.some(obj => {
              if (obj.areaName === item.label) {
                isExist = true;
                return true
              }
            });
            if (!isExist) list.push(item)
          });
          this.options = list;
          this.optionLoading = false
        });
        this.cityId = data.cityId;
        this.active = 'third';
        this.dialogTableVisible = true;
      },
      /*获得区*/
      getAreaList() {
        this.isAreaLoading = true;
        getAreaListApi(this.cityId).then(result => {
          this.areaList = result.data.resultParm.areaList;
          this.isAreaLoading = false
        }).catch(() => {
          this.isAreaLoading = false
        })
      },
      /*删除区*/
      deleteArea(areaName, id) {
        this.isAreaButton = true;
        deletePlaceAreaApi(id)
          .then(() => {
            this.isAreaButton = false;
            this.$refs[areaName].doClose();
            this.getAreaList()
          })
          .catch(() => {
            this.isAreaButton = false;
          })
      },
      /*提交*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.active === 'first') {
              this.isButtonLoading = true;
              addPlaceProvinceApi({provinceName: this.form.location}).then(() => {
                this.getProvinceList();
                this.cancel()
              }).catch(() => {
                this.isButtonLoading = false;
              })
            } else if (this.active === 'second') {
              this.isButtonLoading = true;
              addPlaceCityApi({provinceId: this.provinceId, cityName: this.form.location}).then(() => {
                this.getCityList();
                this.cancel()
              }).catch(() => {
                this.isButtonLoading = false;
              })
            } else {
              this.isButtonLoading = true;
              addPlaceAreaApi({cityId: this.cityId, areaName: this.form.location}).then(() => {
                this.getAreaList();
                this.cancel()
              }).catch(() => {
                this.isButtonLoading = false;
              })
            }
          } else {
            return false;
          }
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

