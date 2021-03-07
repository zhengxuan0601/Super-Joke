<template>
  <div class="co_menuconfig">
    <BreadCrumb :breadcrumb="['博客配置', '文章配置']" />
    <div class="_container">
      <div class="operate_block">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="$router.push('/adminindex/operatearticle')">添加</el-button>
        <el-button
          type="primary"
          :disabled="!selectionIds.length"
          icon="el-icon-delete"
          @click="deleteArtiles(selectionIds)">批量删除</el-button>
      </div>
      <div class="_table">
        <el-table
          @selection-change="selection => selectionIds = selection.map(item => item.id)"
          v-loading="pagination.loading"
          :height="pageContainerHeight - 172"
          :data="pagination.list"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="articleTitle"
            label="文章标题">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="articleDesc"
            label="文章描述">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="articleTag"
            label="文章标签">
            <template slot-scope="scope">
              <span>{{ scope.row.articleTag.join('，') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="readTimes"
            label="阅读量">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发表时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push({ path: '/adminindex/operatearticle', query: { id: scope.row.id } })">编辑</el-button>
              <el-button type="text" size="small" @click="deleteArtiles([scope.row.id])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="_pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findArticleList, deleteArtiles } from '@/api/backSystemApi'
export default {
  data () {
    return {
      selectionIds: [],
      targetMenuInfo: '',
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: []
      }
    }
  },

  created () {
    this.findArticleList()
  },

  methods: {
    findArticleList () {
      this.pagination.loading = true
      findArticleList(this.pagination).then(res => {
        this.pagination = {
          ...this.pagination,
          list: res.data.list,
          total: res.data.total,
          loading: false
        }
      }).catch(() => {
        this.pagination.loading = false
      })
    },

    /**
     * 单个删除和批量删除菜单
     * @param { Array } deleteIds 需要删除菜单id集合
     */
    deleteArtiles (deleteIds) {
      this.$confirm('此操作将永久删除文章同时删除文章下的所有评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArtiles({ ids: deleteIds }).then(res => {
          this.$message({
            message: '删除文章成功',
            type: 'success'
          })
          this.findArticleList()
        })
      })
    },

    handleSizeChange (newSize) {
      this.pagination.pageSize = newSize
      this.pagination.pageNo = 1
      this.findArticleList()
    },

    handleCurrentChange (pageNo) {
      this.pagination.pageNo = pageNo
      this.findArticleList()
    }
  }
}
</script>

<style scoped lang="less">
.co_menuconfig {
  .operate_block {
    padding: 8px 0;
  }
}
</style>
