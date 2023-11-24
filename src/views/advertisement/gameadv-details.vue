<template>
  <div>
    <div class="details">
      <div class="title">广告详情</div>
      <el-table :data="tableData" border style="width: 100%;" align="center" :header-cell-style="{
        height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }">
        <el-table-column v-for="(item, index) in cols" :key="index" :prop=item.prop :label="item.label"
          :min-width="item.width" :align="item.align" />
      </el-table>
      <el-pagination v-if="paginationParams.totals >= 10" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]"
        :page-size="paginationParams.pages" layout="->,total, sizes, prev, pager, next, jumper"
        :total="paginationParams.totals">
      </el-pagination>
    </div>
    <div class="btn"><el-button @click="Back">返回</el-button></div>
  </div>
</template>
<script>
import { GetAdvDetailList } from '@/api/advertisement'
export default {
  data() {
    return {
      cols: [{
        prop: 'carrierName',
        label: '载体',
        width: '120',
        align: "center"
      }, {
        prop: 'gameName',
        label: '游戏名称',
        width: '140',
        align: "center"
      }, {
        prop: 'languageName',
        label: '语言',
        width: '140',
        align: "center"
      }, {
        prop: 'advNum',
        label: '广告数',
        width: '120',
        align: "center"
      }, {
        prop: 'advShowNum',
        label: '广告展示（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'advDownloadNum',
        label: '应用下载（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'advShareNum',
        label: '游戏分享（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'advDiversionNum',
        label: '导流数（次）',
        width: '120',
        align: "center"
      }],
      tableData: [],
      total: 1,
      params: {
        gameName: '',
        page: 1,
        pageSize: 10
      },
      paginationParams: {
        pages: 1,
        totals: 1,
        size: 1,
      }
    }
  },
  created() {
    this.params.gameName = this.$route.query.gameName
    this.getAdvDetailList()
  },
  methods: {
    getAdvDetailList() {
      GetAdvDetailList(this.params).then(res => {
        this.tableData = res.data.list
        this.paginationParams.totals = res.data.total
      })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getAdvDetailList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getAdvDetailList()
    },
    Back() {
      this.$router.go(-1)
    }
  },
};
</script>
<style lang="scss" scoped>
.details {
  background: #fff;
  padding: 32px;

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #101010;
    font-weight: bold;
    margin-bottom: 32px;
  }
}

.el-pagination {
  padding: 20px 40px;
  background: #fff;
}

.btn {
  text-align: center;
  margin-top: 50px;

  .el-button {
    width: 160px;
    padding: 16px 20px;
  }
}
</style>
