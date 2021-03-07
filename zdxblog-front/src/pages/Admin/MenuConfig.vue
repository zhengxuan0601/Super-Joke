<template>
  <div class="co_menuconfig">
    <BreadCrumb :breadcrumb="['博客配置', '菜单配置']" />
    <div class="_container">
      <div class="operate_block">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="targetMenuInfo = ''; menuModelVisible = true">添加</el-button>
        <el-button
          type="primary"
          :disabled="!selectionIds.length"
          icon="el-icon-delete"
          @click="deleteMenu(selectionIds)">批量删除</el-button>
        <el-button
          type="primary"
          :disabled="selectionIds.length !== 1"
          icon="el-icon-delete"
          @click="moveMenu(selectionIds, 'up')">上移</el-button>
        <el-button
          type="primary"
          :disabled="selectionIds.length !== 1"
          icon="el-icon-delete"
          @click="moveMenu(selectionIds, 'down')">下移</el-button>
      </div>
      <div class="_table">
        <el-table
          @selection-change="selection => selectionIds = selection.map(item => item.id)"
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
            prop="menuName"
            label="菜单名称">
          </el-table-column>
          <el-table-column
            prop="menuIcon"
            label="菜单图标">
          </el-table-column>
          <el-table-column
            prop="menuUrl"
            label="URL地址">
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
              @click="targetMenuInfo = scope.row; menuModelVisible = true">编辑</el-button>
              <el-button type="text" size="small" @click="deleteMenu([scope.row.id])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <OperateMenu
      :operateMenuForm="targetMenuInfo"
      @close-model="closeMenuModel"
      v-if="menuModelVisible" />
  </div>
</template>

<script>
import OperateMenu from './dialogs/OperateMenu'
import { findMenuList, deleteMenuByIds, moveMenuItem } from '@/api/backSystemApi'
export default {
  components: { OperateMenu },
  data () {
    return {
      tableData: [],
      menuModelVisible: false,
      loading: false,
      selectionIds: [],
      targetMenuInfo: ''
    }
  },

  created () {
    this.findMenuList()
  },

  methods: {
    findMenuList () {
      this.loading = true
      findMenuList().then(res => {
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
    deleteMenu (deleteIds) {
      this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenuByIds({ ids: deleteIds }).then(res => {
          this.$message({
            message: '删除菜单成功',
            type: 'success'
          })
          this.findMenuList()
        })
      })
    },

    /**
     * 菜单上下移操作
     * @param { Number } menuId 菜单id
     * @param { String } moveType 上下移标志 up - 上移， down - 下移
     */
    moveMenu (menuId, moveType) {
      moveMenuItem({ menuId, moveType }).then(res => {
        this.$message({
          type: 'success',
          message: moveType === 'up' ? '菜单上移成功' : '菜单下移成功'
        })
        this.findMenuList()
      })
    },

    closeMenuModel (renderFlag) {
      this.menuModelVisible = false
      renderFlag && this.findMenuList()
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
