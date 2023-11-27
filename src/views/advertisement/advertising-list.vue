<template>
  <div>
    <div class="inquire">
      <div class="title">广告列表</div>
      <el-row>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value" placeholder="全部广告" @change="getAdValue">
            <el-option v-for="item in AdValue" :key="item.id" :label="item.advName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-button type="primary" style="float: right;" @click="addClick">添加广告</el-button>
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
        <el-table-column label="类型" prop="advTypeName" min-width="120" align="center"></el-table-column>
        <el-table-column label="广告名称" prop="advName" min-width="120" align="center"></el-table-column>
        <el-table-column label="封面类型" prop="imgType" min-width="120" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.imgType == 1">图片</span>
            <span v-show="scope.row.imgType == 2">视频</span>
          </template>
        </el-table-column>
        <el-table-column label="广告封面" prop="advImg" min-width="120" align="center">
          <template slot-scope="scope">
            <video v-if="scope.row.imgType == 2" style="width: 100px; height: 100px;object-fit: cover;cursor: pointer;"
              :src="scope.row.advImg" @click="openVideoDialog(scope.row.advImg)"></video>
            <el-image v-else style="width: 100px; height: 100px" :src="scope.row.advImg"
              :preview-src-list="[scope.row.advImg]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="广告路径类型" prop="urlType" min-width="120" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.urlType == 1">广告链接</span>
            <span v-show="scope.row.urlType == 2">广告包</span>
            <span v-show="scope.row.urlType > 30 && scope.row.urlType < 40">加粉</span>
          </template>
        </el-table-column>
        <el-table-column label="广告路径" prop="advUrl" min-width="120" align="center">
          <template slot-scope="scope">
            <el-link v-show="scope.row.urlType == 1" :href="scope.row.advUrl" target="_blank" type="primary"
              :underline="false">{{ scope.row.advUrl }}</el-link>
            <span v-show="scope.row.urlType != 1">{{ scope.row.advUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" prop="createTime" min-width="120" align="center"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[10, 20, 50, 100]" :page-size="paginationParams.pages"
        layout="->,total, sizes, prev, pager, next, jumper" :total="paginationParams.totals">
      </el-pagination>
    </div>

    <el-dialog title="视频预览" :visible.sync="videoDialogVisible" width="700px" :before-close="handleClose">
      <video style="width: 100%; height: 400px;" :src="previewVideoUrl" controls></video>
    </el-dialog>

  </div>
</template>
<script>
import { GetAdvList } from '@/api/advertisement'
import { GetAdAll } from '@/api/tool'
export default {
  data() {
    return {
      AdValue: [],
      cols: [{
        prop: 'id',
        label: '广告ID',
        width: '100',
        align: "center"
      }, {
        prop: 'advTypeName',
        label: '类型',
        width: '120',
        align: "center"
      }, {
        prop: 'advName',
        label: '广告名称',
        width: '120',
        align: "center"
      }, {
        prop: 'advImg',
        label: '广告封面',
        width: '140',
        align: "center"
      }, {
        prop: 'createTime',
        label: '添加时间',
        width: '120',
        align: "center"
      }],
      value: '',
      tableData: [],
      total: 1,
      params: {
        advId: 0,
        page: 1,
        pageSize: 10
      },
      paginationParams: {
        pages: 1,
        totals: 1,
        size: 1,
      },
      videoDialogVisible: false,
      previewVideoUrl: '',
    }
  },
  created() {
    //获取广告
    GetAdAll().then(res => {
      this.AdValue = res.data
    })
    this.getAdvList()
  },
  methods: {
    //广告搜索
    getAdValue(val) {
      this.params.advId = val
      this.getAdvList();
    },
    //添加广告
    addClick() {
      this.$router.push({ path: '/add-advertising' })
    },
    //获取列表
    getAdvList() {
      let self = this;
      GetAdvList(this.params).then(res => {
        this.tableData = res.data.list
        this.paginationParams.totals = res.data.total
      })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getAdvList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val
      this.getAdvList()

    },
    //校验地址是否是视频
    checkIsVideo(url) {
      return url.endsWith('.mp4')
    },
    //打开视频预览对话框
    openVideoDialog(url) {
      this.previewVideoUrl = url;
      this.videoDialogVisible = true;
    },
    //关闭视频预览对话框
    handleClose(done) {
      this.previewVideoUrl = '';
      this.videoDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.inquire {
  background: #fff;
  padding: 20px 32px;
  margin-bottom: 26px;

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
