<template>
  <div>
    <div class="inquire">
      <div class="title">游戏广告列表</div>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value" placeholder="全部广告" @change="getAdValue">
            <el-option v-for="item in AdValue" :key="item.id" :label="item.advName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value2" placeholder="载体" @change="getCarrierValue">
            <el-option v-for="item in CarrierList" :key="item.id" :label="item.carrierName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value3" placeholder="全部游戏" @change="getGameValue">
            <el-option v-for="item in gameList" :key="item.id" :label="item.gameName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;margin-top: 30px;" align="center" :header-cell-style="{
        height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }">
        <el-table-column label="序号" type="index" width="100" align="center">
          <template scope="scope">
            <span>{{ (params.page - 1) * params.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='typeName' label="类型" min-width="110" align="center" />
        <el-table-column prop='carrierName' label="载体" min-width="120" align="center" />
        <el-table-column prop='languageName' label="语言" min-width="120" align="center" />
        <el-table-column prop='gameName' label="游戏名称" min-width="140" align="center" />
        <el-table-column prop='advName' label="广告名称" min-width="140" align="center" />
        <el-table-column prop='advPositionName' label="广告位置" min-width="140" align="center" />
        <el-table-column prop="states" label="游戏状态" width="140" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.states" :active-value="1" :inactive-value="0"
              @change="stateChanged(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop='advStartTime' label="广告时间" min-width="140" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.advStartTime }}</div>
            {{ scope.row.advEndTime }}
          </template>
        </el-table-column>

        <!-- <el-table-column fixed="right" label="操作" min-width="140" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[10, 20, 50, 100]" :page-size="paginationParams.pages"
        layout="->,total, sizes, prev, pager, next, jumper" :total="paginationParams.totals">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import { GetPageByGameAdv, UpdateState } from '@/api/game'
import { GetAdAll, GetCarrier, GetlistByGame } from '@/api/tool'
export default {
  data() {
    return {
      AdValue: [],
      carrier: [],
      gameList: [],
      cols: [{
        prop: 'advId',
        label: '排序',
        width: '110',
        align: "center"
      },
      {
        prop: 'typeName',
        label: '类型',
        width: '110',
        align: "center"
      }, {
        prop: 'carrierName',
        label: '载体',
        width: '120',
        align: "center"
      }, {
        prop: 'languageName',
        label: '语言',
        width: '120',
        align: "center"
      }, {
        prop: 'gameName',
        label: '游戏名称',
        width: '140',
        align: "center"
      }, {
        prop: 'advName',
        label: '广告名称',
        width: '140',
        align: "center"
      }, {
        prop: 'advPositionName',
        label: '广告位置',
        width: '140',
        align: "center"
      }, {
        prop: 'states',
        label: '广告状态',
        width: '140',
        align: "center"
      }, {
        prop: 'advStartTime',
        label: '广告时间',
        width: '140',
        align: "center"
      }
      ],
      tableData: [],
      total: 1,
      params: {
        advId: 0,
        carrierId: 0,
        gameId: 0,
        page: 1,
        pageSize: 10
      },
      paginationParams: {
        pages: 1,
        totals: 1,
        size: 1,
      },
      CarrierList: [],
      data: {},
      value: '',
      value2: '',
      value3: ''
    }
  },
  created() {
    //获取广告
    GetAdAll().then(res => {
      this.AdValue = res.data
    })
    //获取载体
    GetCarrier().then(res => {
      this.CarrierList = res.data
    })
    //获取全部游戏
    GetlistByGame(this.data).then(res => {
      this.gameList = res.data
    })
    this.getPageByGameAdv()
  },
  methods: {
    //广告搜索
    getAdValue(val) {
      this.params.advId = val
      this.getPageByGameAdv();
      console.log(this.params);
    },
    //载体搜索
    getCarrierValue(val) {
      this.params.carrierId = val
      this.getPageByGameAdv();
    },
    //游戏搜索
    getGameValue(val) {
      this.params.gameId = val
      this.getPageByGameAdv()
    },
    //状态开关
    stateChanged(row) {
      UpdateState({ id: row.id, states: row.states, gameId: row.gameId, positionId: row.positionId }).then(res => {
      })
      this.getPageByGameAdv()
    },
    //列表
    getPageByGameAdv() {
      GetPageByGameAdv(this.params).then(res => {
        this.tableData = res.data.list
        this.paginationParams.totals = res.data.total
      })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getPageByGameAdv()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getPageByGameAdv()

    },
  }
};
</script>
<style lang="scss" scoped>
.inquire {
  background: #fff;
  padding: 20px 32px;

  .title {
    font-size: 16px;
    color: #101010;
    font-weight: bold;
    margin-bottom: 20px;
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
