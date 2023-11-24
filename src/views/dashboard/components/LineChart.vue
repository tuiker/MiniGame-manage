<template>
    <div style="background-color: #fff;border-radius: 6px;">
      <div id="maychar" style="height:400px;width:100%"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
    }
  },
  mounted() {
    // 在通过mounted调用即可
    this.getCharts();
  },
  methods: {
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
          extraCssText:'box-shadow:0 0 10px rgba(0,0,0,0.2)',
          snap: true,

        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售额',
            type: 'line',
            data: [120, 132, 101, 144, 150, 130, 110],
            color: '#6696ee'
          }
        ]
      }
      myChart.setOption(option);
    }

  }
};
</script>
<style lang="scss" scoped>
.new-trend {
  margin-top: 30px;
}
</style>
