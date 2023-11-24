<template>
  <div class="container">
    <div class="inquire">
      <div class="title">新增用户分析</div>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="channel" placeholder="全部渠道" @change="getChannelValue">
            <el-option v-for="item in ChannelList" :key="item.id" :label="item.channelName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="edition" placeholder="全部版本" @change="getEditionValue">
            <el-option v-for="item in VersionList" :key="item.id" :label="item.channelName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="14">
          <div class="date-select">
            <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-button type="primary" @click="inquire">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="new-trend">
      <div class="upper">
        <div class="title">新增趋势</div>
        <div class="right-btn">
          <el-button @click="day" :class="params.type == 1 ? 'active' : ''" plain>天</el-button>
          <!-- <el-button @click="">周</el-button> -->
          <el-button @click="month" :class="params.type == 3 ? 'active' : ''" plain>月</el-button>
        </div>
      </div>
      <el-row style="background-color: #fff;">
        <div id="maychar" style="height:400px;width:100%"></div>
      </el-row>
    </div>
    <el-table :data="tabledata" style="width: 100%;margin-top: 32px;" :header-cell-style="{
      background: '#e3e3e3', height: '56px', color: '#101010', fontSize: '16px', padding: '0 32px'
    }" :cell-style="{ 'padding': '0 40px', 'height': '50px' }">
      <el-table-column prop="dateTime" label="日期" min-width="100%">
      </el-table-column>
      <el-table-column prop="count" label="新增用户" min-width="100%">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import echarts from 'echarts'
import { GetAddUserDataStatistics } from '@/api/page'
import { GetChannelList, GetVersionList } from '@/api/tool'
export default {
  data() {
    return {
      params: {
        type: 1,
        channel: 0,
        version: 0,
        startTime: "",
        endTime: ""
      },
      ChannelList: [],
      VersionList: [],
      channel: '',
      edition: '',
      date: '',
      tabledata: [],
      xArray: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      yArray: [120, 132, 101, 144, 150, 130, 110],
    }
  },
  created() {
    //获取全部渠道下拉
    GetChannelList().then(res => {
      this.ChannelList = res.data
    })
    //获取全部版本下拉
    GetVersionList().then(res => {
      this.VersionList = res.data
    })
  },
  mounted() {
    this.Getdata()

  },
  methods: {
    //渠道搜索
    getChannelValue(val) {
      this.params.channel = val
      this.Getdata()
    },
    //版本搜索
    getEditionValue(val) {
      this.params.version = val
      this.Getdata()
    },
    //时间搜索
    inquire() {
      this.params.startTime = this.date[0]
      this.params.endTime = this.date[1]
      this.Getdata()
    },
    //线图表日筛选
    day() {
      this.params.type = 1
      this.Getdata()
    },
    //线图表日筛选
    month() {
      this.params.type = 3
      this.Getdata()
    },
    //获取数据
    Getdata() {
      GetAddUserDataStatistics(this.params).then(res => {
        this.tabledata = res.data
        if (res.data) {
          this.xArray = []
          this.yArray = []
          res.data.map(item => {
            this.xArray.push(item.dateTime)
            this.yArray.push(item.count)
          })
        }
        this.getCharts();
      })
    },
    getCharts() {
      var myChart = echarts.init(document.getElementById('maychar'));

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: '#fff',
          padding: [10, 15],
          textStyle: {
            color: '#333'
          },
          extraCssText: 'box-shadow:0 0 10px rgba(0,0,0,0.2)',
          snap: true,

        },
        xAxis: {
          type: 'category',
          data: this.xArray
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '用户注册',
            type: 'line',
            data: this.yArray,
            color: '#6696ee'
          }
        ]
      }
      myChart.setOption(option);
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: #101010;
  font-weight: bold;
}

.inquire {
  background: #fff;
  padding: 20px 32px;

  .title {
    font-size: 16px;
    color: #101010;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .date-select {
    .el-button {
      margin-left: 26px;
    }
  }
}

.new-trend {
  margin-top: 30px;

  .upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 32px;
    background: #e3e3e3;

    .title {
      font-size: 16px;
      color: #101010;
      font-weight: bold;
    }

    .right-btn {
      .el-button+.el-button {
        margin-left: 0;
      }

      .el-button {
        padding: 10px 20px;
      }

      .active {
        color: #3a8ee6;
        border-color: #b3d8ff;
        background: #ecf5ff;
        outline: 0;
      }
    }
  }
}
</style>
