<template>
  <div class="inquire">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="3">
        <el-select v-model="value" placeholder="全部游戏" @change="getValue">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
        label: '羊了个羊'
      }, {
        value: '2',
        label: '忍着神'
      }, {
        value: '3',
        label: '米兔环境'
      }],
      value: ''
    }
  },
  methods: {
    getValue(val) {
      console.log('全部游戏' + val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
