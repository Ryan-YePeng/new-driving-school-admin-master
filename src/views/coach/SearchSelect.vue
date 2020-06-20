<template>
  <el-select
      v-if="has"
      v-model="val"
      placeholder="请输入所属驾校"
      clearable
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="searchLoading"
      @change="change">
    <el-option
        v-for="item in selectOptions"
        :key="item.schoolId"
        :label="item.schoolFullName"
        :value="item.schoolId"
    >
      <span style="float: left">{{ item.schoolFullName }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.position }}</span>
    </el-option>
  </el-select>
</template>

<script>
  import {getSchoolNameApi} from '@/api/coach'

  export default {
    name: "SearchSelect",
    props: {
      value: {
        type: String | Number
      }
    },
    data() {
      return {
        val: null,
        has: true,
        searchLoading: false,
        selectOptions: []
      }
    },
    watch: {
      value(val) {
        if (!val && this.val) { // 只有外边重置才执行
          this.selectOptions = [];
          this.has = false;
          this.$nextTick(() => {
            this.val = null;
            this.has = true
          })
        }
      }
    },
    methods: {
      change(val) {
        let selectItem = null;
        if (val) {
          this.selectOptions.some(item => {
            if (item.schoolId === val) {
              selectItem = item;
              return true
            }
          })
        }
        this.$emit('input', val);
        this.$emit('get', selectItem);
      },
      remoteMethod(query) {
        if (query) {
          this.searchLoading = true;
          getSchoolNameApi(query)
            .then(result => {
              this.searchLoading = false;
              let areaData = '';
              let schoolNameOptionsData = result.data.resultParm.schoolNameList;
              for (let i = 0; i < schoolNameOptionsData.length; i++) {
                areaData = schoolNameOptionsData[i].province + " " + schoolNameOptionsData[i].city + " " + schoolNameOptionsData[i].area + "";
                schoolNameOptionsData[i].position = areaData
              }
              this.selectOptions = schoolNameOptionsData
            })
            .catch(() => {
              this.searchLoading = false;
            })
        } else {
          this.selectOptions = [];
        }
      }
    }
  }
</script>
