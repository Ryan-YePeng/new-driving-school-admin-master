<template>
  <div>
    <div v-show="isShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章列表</span>
          <el-button style="float: right" type="primary" class="el-icon-circle-plus-outline" @click="add"> 新增
          </el-button>
        </div>
        <div>
          <el-input placeholder="搜索文章标题" v-model="searchTitle" clearable style="width: 180px" size="mini"
                    @keyup.enter.native="getArticle"></el-input>
          <el-select v-model="searchType" placeholder="搜索文章类型" clearable size="mini" @change="getArticle">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-button type="success" class="el-icon-search" size="mini" @click="getArticle">搜索</el-button>
          <el-table v-loading="isLoading" :data="articleData" max-height="100%" style="width: 100%">
            <el-table-column
              prop="articleTitle"
              :show-overflow-tooltip="true"
              label="文章标题">
            </el-table-column>
            <el-table-column
              prop="articleType"
              label="文章类型">
            </el-table-column>
            <el-table-column label="文章图片">
              <template slot-scope="scope">
                <el-avatar shape="square" :size="50" :src="baseUrl + scope.row.articlePicture">
                  <img src="../../../assets/noFoundPicture.png"/>
                </el-avatar>
              </template>
            </el-table-column>
            <el-table-column
              prop="articleSort"
              label="文章排序">
            </el-table-column>
            <el-table-column label="创建时间" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | formatDateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button type="primary" class="el-icon-edit" @click="edit(scope.row)" size="mini"></el-button>
                <el-popover
                  :ref="scope.row.articleId"
                  placement="top"
                  width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.articleId].doClose()">取消</el-button>
                    <el-button :loading="isLoadingButton" type="primary" size="mini"
                               @click.stop="deleteArticle(scope.row.articleId)">确定
                    </el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <pagination ref="pagination" @getNewData="getArticle"></pagination>
        </div>
      </el-card>
    </div>
    <div v-show="!isShow">
      <article-detail ref="ArticleDetail" @tab="tab" @update="getArticle"></article-detail>
    </div>
  </div>
</template>

<script>
  import ArticleDetail from './detail'

  import {
    getArticleApi,
    deleteArticleApi,
    getArticleTypeApi
  } from "@/api/article";
  import Pagination from '@/components/pagination'
  import {articleCoverPictureBaseUrl} from '@/utils/path'
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {Pagination, ArticleDetail},
    data() {
      return {
        isShow: true,
        articleData: [],
        isLoading: false,
        isLoadingButton: false,
        searchTitle: '',
        searchType: '',
        options: []
      }
    },
    mounted() {
      this.getArticle();
      getArticleTypeApi().then(result => {
        this.options = result.data.resultParm.articleTypeList;
      })
    },
    computed: {
      baseUrl() {
        return articleCoverPictureBaseUrl
      }
    },
    methods: {
      // 切换
      tab() {
        this.isShow = !this.isShow
      },
      // 获取列表
      getArticle() {
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&articleTitle=${this.searchTitle}&articleType=${this.searchType}`;
        getArticleApi(param).then(result => {
          let response = result.data.resultParm.articleList;
          this.articleData = response.records;
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      },
      // 删除文章
      deleteArticle(id) {
        this.isLoadingButton = true;
        deleteArticleApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getArticle()
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
          })
      },
      // 新增文章
      add() {
        let _this = this.$refs['ArticleDetail'];
        _this.title = '新增文章';
        _this.init();
        this.tab()
      },
      // 修改文章
      edit(data) {
        let _this = this.$refs['ArticleDetail'];
        let _form = _this.form;
        _this.title = '编辑文章';
        _this.articleId = data.articleId;
        objectEvaluate(data, _form);
        _this.setContent(data.articleContent);
        this.tab()
      },

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
