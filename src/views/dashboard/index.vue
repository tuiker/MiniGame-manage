<template>
  <div class="home-container">
    <div class="panel">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="{ span: '24-5' }" v-for="(item, index) in datalist" :key="index"
          class="card-panel-col">
          <panel :title="item.title" :totality="item.totality" :today_text="item.today_text" :today="item.today"
            :yesterday_text="item.yesterday_text" :yesterday="item.yesterday" :colors="colors[index]" />
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="30" style="margin-top: 32px;" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="18">
        <line-chart />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="card-panel">
          <div class="title">用户概况</div>
          <div class="desc">
            <panel class="special" v-for="(item, index) in datalist2" :key="index" :title="item.title"
              :totality="item.totality" :today_text="item.today_text" :today="item.today"
              :yesterday_text="item.yesterday_text" :yesterday="item.yesterday" :colors="colors2[index]" />
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="table">
      <div class="title">游戏概况</div>
      <Table />
    </div>
  </div>
</template>

<script>
import Panel from './components/Panel.vue'
import LineChart from './components/LineChart.vue'
import Table from './components/Table.vue'

export default {
  name: 'home',
  data() {
    return {
      datalist: [{
        title: "活跃在线用户数",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      },
      {
        title: "活跃在线用户数",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      }, {
        title: "活跃在线用户数",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      }, {
        title: "活跃在线用户数",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      }, {
        title: "活跃在线用户数",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      }],
      datalist2: [{
        title: "H5注册",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      },
      {
        title: "安卓注册",
        totality: '418000',
        today_text: '今日',
        today: '9577',
        yesterday_text: '昨日',
        yesterday: '10056'
      }],
      colors: ['#bc8ef7', '#f18f99', '#8098f2', '#c3c34a', '#448787'],
      colors2: ['#bc8ef7', '#c3c34a']
    }
  },
  components: {
    Panel,
    LineChart,
    Table
  }
}
</script>

<style lang="scss" scoped>
.home-container {

  .panel-group {
    .card-panel {
      height: 400px;
      background: #fff;
      border-radius: 6px;
      padding: 16px 30px;

      .title {
        color: #101010;
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 20px;
      }

      .desc {
        .content {
          .title {
            font-size: 18px;
            color: #101010;
            border: 1px solid;
          }
        }
        >div+div {
          margin-top: 26px;
        }
      }
    }
  }

  .table{
    margin-top: 32px;
    padding: 20px 30px;
    background: #fff;
    border-radius: 6px;

    .title{
      color: #101010;
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 20px;
    }
  }

}


@media (min-width: 992px) {
  .el-col-lg-24-5 {
    width: 33.3%;
  }
}

@media (min-width: 1350px) {
  .el-col-lg-24-5 {
    width: 20%;
  }
}
</style>
