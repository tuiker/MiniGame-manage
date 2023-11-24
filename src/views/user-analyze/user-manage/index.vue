<template>
  <div>
    <div class="inquire">
      <div class="title">用户管理</div>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="5">
          <el-input v-model="params.userInfo" placeholder="用户昵称/ID/邮箱/手机号"></el-input>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value" placeholder="属性" @change="getstatsIdValue">
            <el-option v-for="item in options" :key="item.id" :label="item.statsName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="16">
          <div class="date-select">
            <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-button type="primary" @click="inquire">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table">
        <el-table :data="tableData" border style="width: 100%;margin-top: 30px;" align="center" :header-cell-style="{
      background: '#e3e3e3', height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
    }" :row-style="{ 'height': '20px', 'padding': '0' }">
      <el-table-column prop="id" label="ID" min-width="120">
      </el-table-column>
      <el-table-column prop="userName" label="昵称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="userImg" label="图像" min-width="200" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.userImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="userSex" label="性别" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="userStatsName" label="属性" min-width="160" align="center">
      </el-table-column>
      <el-table-column prop="gameTimeAll" label="游戏时长" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="signTime" label="注册时间" min-width="240" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="140" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
      :page-sizes="[10, 20, 50, 100]" :page-size="paginationParams.pages"
      layout="->,total, sizes, prev, pager, next, jumper" :total="paginationParams.totals">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { GetUserInfoList } from '@/api/page'
import { GetStatsList } from '@/api/tool'
export default {
  data() {
    return {
      options: [],
      tableData: [],
      date: '',
      input: '',
      value: '',
      params: {
        userInfo: '',
        statsId: 0,
        startTime: '',
        endTime: '',
        page: 1,
        pageSize: 10,
      },
      params: {
        id: 0,
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
    this.getUserInfoList()
    //获取属性下拉
    GetStatsList().then(res => {
      this.options = res.data
    })
  },
  methods: {
    //获取列表数据
    getUserInfoList() {
      GetUserInfoList(this.params).then(res => {
        this.tableData = res.data.list
        this.paginationParams.totals = res.data.total
      })
    },
    getstatsIdValue(val) {
      //属性搜索
      this.params.statsId = val
      this.getUserInfoList()
    },
    //时间筛选
    inquire() {
      this.params.startTime = this.date[0]
      this.params.endTime = this.date[1]
      this.getUserInfoList()
    },
    handleClick(id) {
      this.$router.push({ path: '/details', query: { id: id } })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getUserInfoList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getUserInfoList()

    },
  }
}
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

  .date-select {
    .el-button {
      margin-left: 20px;
    }
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
