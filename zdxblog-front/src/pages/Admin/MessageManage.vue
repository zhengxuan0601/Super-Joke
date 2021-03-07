<template>
  <div class="co_mesmanage">
    <BreadCrumb :breadcrumb="['博客配置', '留言管理']" />
    <div class="_container">
      <div class="operate_block">
        <el-button
          type="primary"
          :disabled="!selectionIds.length"
          icon="el-icon-delete"
          @click="deleteMessage(selectionIds)">批量删除</el-button>
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
            prop="nickName"
            label="留言昵称">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="message"
            label="留言信息">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            label="留言时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteMessage([scope.row.id])">删除</el-button>
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
import { findMessageList, deleteMessage } from '@/api/backSystemApi'
export default {
  data () {
    return {
      selectionIds: [],
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
    this.findMessageList()
  },

  methods: {
    findMessageList () {
      this.pagination.loading = true
      findMessageList(this.pagination).then(res => {
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
     * 单个删除和批量删除留言
     * @param { Array } deleteIds 需要删除留言id集合
     */
    deleteMessage (deleteIds) {
      this.$confirm('此操作将永久删除留言或该留言下的评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMessage({ ids: deleteIds }).then(res => {
          this.$message({
            message: '删除留言成功',
            type: 'success'
          })
          this.findMessageList()
        })
      })
    },

    handleSizeChange (newSize) {
      this.pagination.pageSize = newSize
      this.pagination.pageNo = 1
      this.findMessageList()
    },

    handleCurrentChange (pageNo) {
      this.pagination.pageNo = pageNo
      this.findMessageList()
    }
  }
}
</script>

<style scoped lang="less">
.co_mesmanage {
  .operate_block {
    padding: 8px 0;
  }
}
</style>
