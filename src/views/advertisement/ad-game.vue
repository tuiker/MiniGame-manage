<template>
  <div class="ad-game">
    <el-row :gutter="200">
      <el-col :xs="12" :sm="12" :lg="8" v-for="(item, index) in datalist" :key="index" class="card-panel-col">
        <panel :title="item.title" :totality="item.totality" :today_text="item.today_text" :today="item.today"
          :yesterday_text="item.yesterday_text" :yesterday="item.yesterday" :colors="colors[index]" />
      </el-col>
    </el-row>
    <div class="inquire">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value" placeholder="综合排序" @change="getSynthesisValue">
            <el-option v-for="item in synthesis" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value2" placeholder="载体" @change="getCarrierValue">
            <el-option v-for="item in CarrierList" :key="item.id" :label="item.carrierName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="5">
          <el-input v-model="params.advName" placeholder="请输入广告名称"></el-input>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <el-date-picker style="width: 100%;" value-format="yyyy-MM-dd" v-model="params.dateStr" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="2">
          <el-button type="primary" @click="inquire">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;" align="center" :header-cell-style="{
        height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }">
        <el-table-column label="序号" type="index" width="100" align="center">
          <template scope="scope">
            <span>{{ (params.page - 1) * params.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='carrierName' label="载体" min-width="120" align="center" />
        <el-table-column prop='gameName' label="游戏名称" min-width="140" align="center">
          <template slot-scope="scope">
            <el-button @click="todetails(scope.row)" type="text">{{ scope.row.gameName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop='gameClickNum' label="游戏点击（次）" min-width="120" align="center" />
        <el-table-column prop='advShowNum' label="广告展示（次）" min-width="120" align="center" />
        <el-table-column prop='advDownloadNum' label="应用下载（次）" min-width="120" align="center" />
        <el-table-column prop='advShareNum' label="游戏分享（次）" min-width="120" align="center" />
        <el-table-column prop='advDiversionNum' label="导流数（次）" min-width="120" align="center" />
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[10, 20, 50, 100]" :page-size="paginationParams.pages"
        layout="->,total, sizes, prev, pager, next, jumper" :total="paginationParams.totals">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Panel from './components/Panel'
import { GetAdvBoard, GetGameAdvList } from '@/api/advertisement'
import { GetCarrier } from '@/api/tool'
export default {
  data() {
    return {
      datalist: [{
        title: "总广告数",
        totality: 0,
        today_text: '安卓',
        today: 0,
        yesterday_text: 'H5',
        yesterday: 0
      },
      {
        title: "广告展示（次）",
        totality: 0,
        today_text: '今日',
        today: 0,
        yesterday_text: '昨日',
        yesterday: 0
      }, {
        title: "广告应用下载（次）",
        totality: 0,
        today_text: '今日',
        today: 0,
        yesterday_text: '昨日',
        yesterday: 0
      }],
      colors: ['#8098f2', '#f18f99', '#448787'],
      cols: [],
      tableData: [],
      total: 1,
      params: {
        clickTypeId: null,
        advName: '',
        carrierId: null,
        dateStr: '',
        page: 1,
        pageSize: 10
      },
      paginationParams: {
        pages: 1,
        totals: 1,
        size: 1,
      },
      CarrierList: [],
      synthesis: [{
        id: 1,
        label: '广告展示'
      }, {
        id: 2,
        label: '应用下载'
      }, {
        id: 3,
        label: '导流'
      }, {
        id: 4,
        label: '其他'
      }, {
        id: 5,
        label: '分享'
      }],
      carrier: [],
      AdName: '',
      value: '',
      value2: '',
    }
  },
  components: { Panel },
  created() {
    GetAdvBoard().then(res => {
      this.datalist[0].totality = res.data.advNum
      this.datalist[0].today = res.data.advAndroidNum
      this.datalist[0].yesterday = res.data.advH5Num
      this.datalist[1].totality = res.data.advShowNum
      this.datalist[1].today = res.data.advTodayShowNum
      this.datalist[1].yesterday = res.data.advYesterdayShowNum
      this.datalist[2].totality = res.data.advDownloadNum
      this.datalist[2].today = res.data.advTodayDownloadNum
      this.datalist[2].yesterday = res.data.advYesterdayDownloadNum
    })
    this.getGameAdvList()
    //获取载体
    GetCarrier().then(res => {
      this.CarrierList = res.data
    })
  },
  methods: {
    //综合排序搜索
    getSynthesisValue(val) {
      this.params.clickTypeId = val
      this.getGameAdvList();
    },
    //载体搜索
    getCarrierValue(val) {
      this.params.carrierId = val
      this.getGameAdvList();
    },
    inquire() {
      this.getGameAdvList()
    },
    //列表
    getGameAdvList() {
      GetGameAdvList(this.params).then(res => {
        this.tableData = res.data.list
        this.paginationParams.totals = res.data.total
      })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getGameAdvList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getGameAdvList()

    },
    //详情跳转
    todetails(data) {
      this.$router.push({ path: '/gameadv-details', query: { gameName: data.gameName } })
    }
  },
};
</script>
<style lang="scss" scoped>
.ad-game {
  .inquire {
    margin: 50px 0 10px;
  }

  .table {
    // background: #fff;

    .el-pagination {
      padding: 20px 40px;
      background: #fff;
    }
  }
}
</style>
