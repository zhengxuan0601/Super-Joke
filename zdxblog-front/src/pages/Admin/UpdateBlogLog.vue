<template>
  <div class="co_updatelog">
    <BreadCrumb :breadcrumb="['博客配置', '留言管理']" />
    <div class="_container">
      <div class="operate_block">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="targetUpdateInfo = ''; updateVisible = true">添加</el-button>
        <el-button
          type="primary"
          :disabled="!selectionIds.length"
          icon="el-icon-delete"
          @click="batchDeleteLogs(selectionIds)">批量删除</el-button>
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
            prop="updateContent"
            label="更新内容">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="updateBlogTime"
            label="更新日期">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="targetUpdateInfo = scope.row; updateVisible = true">编辑</el-button>
              <el-button type="text" size="small" @click="batchDeleteLogs([scope.row.id])">删除</el-button>
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
    <OperateUpdateLog
      :operateLogForm="targetUpdateInfo"
      @close-model="closeOperateModel"
      v-if="updateVisible" />
  </div>
</template>

<script>
import OperateUpdateLog from './dialogs/OperateUpdateLog'
import { findUpdateLog, batchDeleteLogs } from '@/api/backSystemApi'
export default {
  components: { OperateUpdateLog },
  data () {
    return {
      selectionIds: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        list: []
      },
      updateVisible: false,
      targetUpdateInfo: ''
    }
  },

  created () {
    this.findUpdateLog()
  },

  methods: {
    findUpdateLog () {
      this.pagination.loading = true
      const searchParams = {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      }
      findUpdateLog(searchParams).then(res => {
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
    batchDeleteLogs (deleteIds) {
      this.$confirm('此操作将永久删除更新日志, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteLogs({ ids: deleteIds }).then(res => {
          this.$message({
            message: '删除更新日志成功',
            type: 'success'
          })
          this.findUpdateLog()
        })
      })
    },

    closeOperateModel (renderFlag) {
      renderFlag && this.findUpdateLog()
      this.updateVisible = false
    },

    handleSizeChange (newSize) {
      this.pagination.pageSize = newSize
      this.pagination.pageNo = 1
      this.findUpdateLog()
    },

    handleCurrentChange (pageNo) {
      this.pagination.pageNo = pageNo
      this.findUpdateLog()
    }
  }
}
</script>

<style scoped lang="less">
.co_updatelog {
  .operate_block {
    padding: 8px 0;
  }
}
</style>
