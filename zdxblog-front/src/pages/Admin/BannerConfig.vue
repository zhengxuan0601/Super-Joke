<template>
  <div class="co_bannerconfig">
    <BreadCrumb :breadcrumb="['博客配置', 'Banner配置']" />
    <div class="_container">
      <div class="operate_block">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="targetBannerInfo = ''; bannerModelVisible = true">添加</el-button>
        <el-button
          type="primary"
          :disabled="!selectionIds.length"
          icon="el-icon-delete"
          @click="deleteMenu(selectionIds)">批量删除</el-button>
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
            prop="bannerName"
            label="Banner名称">
          </el-table-column>
          <el-table-column
            prop="bannerUrl"
            label="BannerURL">
          </el-table-column>
          <el-table-column
            prop="menuIcon"
            label="Banner图片">
            <template slot-scope="scope">
              <img
                style="width: 32px;"
               :src="'data:image/png;base64,' + scope.row.bannerImgSrc" alt="">
            </template>
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
              @click="targetBannerInfo = scope.row; bannerModelVisible = true">编辑</el-button>
              <el-button type="text" size="small" @click="deleteMenu([scope.row.id])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <UplodBanner
      :bannerInfo="targetBannerInfo"
      @close-model="closeMenuModel"
      v-if="bannerModelVisible" />
  </div>
</template>

<script>
import UplodBanner from './dialogs/UplodBanner'
import { findBannerList, deleteBatchBanners } from '@/api/backSystemApi'
export default {
  components: { UplodBanner },
  data () {
    return {
      tableData: [],
      bannerModelVisible: false,
      loading: false,
      selectionIds: [],
      targetBannerInfo: ''
    }
  },

  created () {
    this.findBannerList()
  },

  methods: {
    findBannerList () {
      this.loading = true
      findBannerList().then(res => {
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
      this.$confirm('此操作将永久删除该banner配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatchBanners({ ids: deleteIds }).then(res => {
          this.$message({
            message: '删除Banner成功',
            type: 'success'
          })
          this.findBannerList()
        })
      })
    },

    closeMenuModel (renderFlag) {
      this.bannerModelVisible = false
      renderFlag && this.findBannerList()
    }
  }
}
</script>

<style scoped lang="less">
.co_bannerconfig {
  .operate_block {
    padding: 8px 0;
  }
}
</style>
