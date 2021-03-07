<template>
  <div class="co_usermanage">
    <BreadCrumb :breadcrumb="['博客配置', '用户管理']" />
    <div class="_container">
      <div class="operate_block">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="targetUserInfo = ''; userModelVisible = true">添加</el-button>
        <el-button
          type="primary"
          :disabled="!selectionIds.length"
          icon="el-icon-delete"
          @click="deleteBatchuser(selectionIds)">批量删除</el-button>
      </div>
      <div class="_table">
        <el-table
          @selection-change="selection => selectionIds = selection.map(item => item.accountName)"
          v-loading="loading"
          :height="pageContainerHeight - 121"
          :data="tableData"
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
            prop="accountName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="用户昵称">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="email"
            label="Email">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="job"
            label="职业">
          </el-table-column>
          <el-table-column
            prop="address"
            label="现居地">
          </el-table-column>
          <el-table-column
            prop="qq"
            label="QQ号">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small"
              @click="targetUserInfo = scope.row; userModelVisible = true">编辑</el-button>
              <el-button type="text" size="small" @click="deleteBatchuser([scope.row.accountName])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <OperateUserInfo
      :operateUserForm="targetUserInfo"
      @close-model="closeMenuModel"
      v-if="userModelVisible" />
  </div>
</template>

<script>
import OperateUserInfo from './dialogs/OperateUserInfo'
import { findAllusers, deleteBatchuser } from '@/api/backSystemApi'
export default {
  components: { OperateUserInfo },
  data () {
    return {
      tableData: [],
      userModelVisible: false,
      loading: false,
      selectionIds: [],
      targetUserInfo: ''
    }
  },

  created () {
    this.findAllusers()
  },

  methods: {
    findAllusers () {
      this.loading = true
      findAllusers().then(res => {
        this.tableData = res.data || []
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    /**
     * 单个删除和批量删除菜单
     * @param { Array } deleteIds 需要删除菜单id集合
     */
    deleteBatchuser (deleteIds) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatchuser({ ids: deleteIds }).then(res => {
          this.$message({
            message: '删除用户成功',
            type: 'success'
          })
          this.findAllusers()
        })
      })
    },

    closeMenuModel (renderFlag) {
      this.userModelVisible = false
      renderFlag && this.findAllusers()
    }
  }
}
</script>

<style scoped lang="less">
.co_usermanage {
  .operate_block {
    padding: 8px 0;
  }
}
</style>
