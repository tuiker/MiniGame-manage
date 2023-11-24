<template>
  <div class="inquire">
    <div class="title">用户管理</div>
    <el-row  :gutter="20">
      <el-col :xs="12" :sm="12" :lg="5">
        <el-input v-model="input" placeholder="用户昵称/ID/邮箱/手机号"></el-input>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="3">
        <el-select v-model="value" placeholder="属性" @change="getEditionValue">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: '1',
        label: '未点广告'
      }, {
        value: '2',
        label: '点击广告'
      }, {
        value: '3',
        label: '下载应用'
      }],
      date: '',
      input: '',
      value: '',
    }
  },
  methods: {
    getChannelValue(val) {
      console.log('全部渠道' + val);
    },
    getEditionValue(val) {
      console.log('全部版本' + val);
    },
    inquire() {
      const star = this.date[0]
      const end = this.date[1]
      // console.log('开始时间:', star, '结束时间:', end);
      this.$emit('DateSelect', star, end);
    }
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

  .date-select {
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
