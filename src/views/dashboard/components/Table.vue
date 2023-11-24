<template>
  <div> <el-table :data="tableData" border style="width: 100%;"  align="center" :header-cell-style="{
        height: '56px', color: '#101010', fontSize: '16px','text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }">
      <template v-for="(item, index) in cols">
        <el-table-column :key="index" :prop=item.prop :label="item.label" :min-width="item.width" :align="item.align" />
      </template>
    </el-table></div>
</template>
<script>
export default {
  data() {
    return {
      cols: [{
        prop: 'ranking',
        label: '排名',
        width: '100',
        align: "center"
      }, {
        prop: 'type',
        label: '类型',
        width: '120',
        align: "center"
      }, {
        prop: 'carrier',
        label: '载体',
        width: '120',
        align: "center"
      }, {
        prop: 'game_name',
        label: '游戏名称',
        width: '140',
        align: "center"
      }, {
        prop: 'user_number',
        label: '用户数',
        width: '120',
        align: "center"
      }, {
        prop: 'ad_count',
        label: '广告数',
        width: '120',
        align: "center"
      }, {
        prop: 'advertising',
        label: '广告展示（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'game_analysis',
        label: '游戏分享（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'download',
        label: '应用下载（次）',
        width: '120',
        align: "center"
      }, {
        prop: 'river_diversion',
        label: '导流数（次）',
        width: '120',
        align: "center"
      }],
      tableData: [{
        ranking: 1,
        type: '竞技',
        carrier:'123',
        game_name: 'COC',
        user_number: 1000,
        ad_count: 1000,
        advertising: 10,
        game_analysis: 99,
        download: 1009,
        river_diversion: 123,
      },
      ]
    }
  },
};
</script>
<style lang="scss" scoped></style>
