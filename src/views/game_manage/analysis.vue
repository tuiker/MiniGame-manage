<template>
  <div class="analysis">
    <div class="title">游戏分析</div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;" align="center" :header-cell-style="{
        height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }">
        <el-table-column label="排名" type="index" width="100" align="center">
          <template scope="scope">
            <span>{{ (params.page - 1) * params.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in cols" :key="index" :prop=item.prop :label="item.label"
          :min-width="item.width" :align="item.align" />
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[10, 20, 50, 100]" :page-size="paginationParams.pages"
        layout="->,total, sizes, prev, pager, next, jumper" :total="paginationParams.totals">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { GetPageByGameAnalysis } from '@/api/game'
export default {
  data() {
    return {
      cols: [{
        prop: 'typeName',
        label: '类型',
        width: '120',
        align: "center"
      }, {
        prop: 'gameName',
        label: '游戏名称',
        width: '140',
        align: "center"
      }, {
        prop: 'userNum',
        label: '用户数',
        width: '120',
        align: "center"
      }, {
        prop: 'advNum',
        label: '广告数',
        width: '120',
        align: "center"
      }, {
        prop: 'gameClickNum',
        label: '游戏点击（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'advGameNum',
        label: '广告展示（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'gameShareNum',
        label: '游戏分享（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'downloadNum',
        label: '应用下载（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'diversionNum',
        label: '导流数（次）',
        width: '120',
        align: "center"
      }],
      tableData: [],
      total: 1,
      params: {
        page: 1,
        pageSize: 10
      },
      paginationParams: {
        pages: 1,
        totals: 1,
        size: 1,
      },
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      GetPageByGameAnalysis(this.params).then(res => {
        this.tableData = res.data.list
        this.paginationParams.totals = res.data.total
      })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getList()
    }
  },
}
</script>
<style lang="scss" scoped>
.analysis {
  background: #fff;
  padding: 32px 32px 0;

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #101010;
    font-weight: bold;
    margin-bottom: 32px;
  }
}

.table {
  // background: #fff;

  .el-pagination {
    padding: 20px 40px;
    background: #fff;
  }
}
</style>
