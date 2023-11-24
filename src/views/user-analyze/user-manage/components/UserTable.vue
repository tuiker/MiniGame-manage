<template>
  <div class="usertable">
    <el-table :data="tableData" border style="width: 100%;" align="center"
      :header-cell-style="{
        background: '#e3e3e3', height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }">
      <el-table-column prop="date" label="ID" min-width="120">
      </el-table-column>
      <el-table-column prop="name" label="昵称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="address" label="图像" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="stats" label="属性" min-width="160" align="center">
      </el-table-column>
      <el-table-column prop="stats" label="游戏时长" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="stats" label="注册时间" min-width="240" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="140" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: '女',
        stats: '未',
        sex: '女',
        stats: '未'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: '女',
        stats: '未',
        sex: '女',
        stats: '未'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: '女',
        stats: '未',
        sex: '女',
        stats: '未'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: '女',
        stats: '未',
        sex: '女',
        stats: '未'
      }]
    }
  },
  methods: {
    handleClick() {
      console.log('详情');
      this.$router.push({ path: '/details' })
    }
  },
}
</script>
<style lang="scss" scoped>
.usertable {
  margin-top: 30px;
}

.el-table__header {
  border: 1px solid red;
}
</style>
