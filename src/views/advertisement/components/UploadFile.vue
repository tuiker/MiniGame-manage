<template>
  <div style="width: 400px;">
    <el-upload :limit="limit" action :accept="accept" :on-change="uploadFile" list-type="text"
      :auto-upload="false" :file-list="fileList" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove" ref="upload" :disabled="disabled" drag>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传{{ accept }}文件</div>
    </el-upload>
  </div>
</template>

<script>
//引入上传图片接口
import { UploadImg } from "@/api/page";
export default {
  props: {
    limit: Number,
    fileList: Array,
    disabled: Boolean,
    accept: {
      type: String,
      default: ".apk"
    }
  },
  data() {
    return {
      loading: null,
      showUpload: false, //控制limit最大值之后 关闭上传按钮
      imgUrl: [], //上传图片后地址合集
    };
  },
  methods: {
    //文件列表移除文件时的函数
    handleRemove(file, fileList) {
      const index = this.fileList.findIndex((item) => item === file.uid);
      this.imgUrl.splice(index, 1);
      this.$emit("delUrl", this.imgUrl);
      if (fileList.length < this.limit) this.showUpload = false;
    },
    //点击文件列表中已上传的文件时的函数
    handlePictureCardPreview(file) {
      this.imgUrl.url = file.url;
      this.dialogVisible = true;
    },
    //这里是不需要直接上传而是通过按钮上传的方法
    submitUpload() {
      this.$refs.upload.submit();
    },
    //文件状态改变时的函数(主要逻辑函数)
    uploadFile(e, fileList) {
      //判断用户上传最大数量限制,来让上传按钮消失
      if (fileList.length >= this.limit) this.showUpload = true;
      this.loading = this.$loading({
        lock: true,
        text: '上传中',
        spinner: 'el-icon-loading'
      });
      // const file = e.file; <- 这里是不需要直接上传而是通过按钮上传的
      const file = e.raw; // <- 这里是直接上传的
      if (this.limit == 1) this.imgUrl = []; //此处判断为一张的时候需要清空数组
        let params = new FormData();
        params.append("files", file);
        UploadImg(params).then((res) => {
          this.loading.close();
          this.$message.success("上传成功！");
          this.$emit("getUrl", res.data[0]);
        }).catch((err) => {
          this.loading.close();
          this.$message.error("上传失败，请重试！");
        });
    },
    //文件超出个数限制时的函数
    handleExceed(files, fileList) {
      this.$message.info(`最多只允许上传${this.limit}个文件`);
    }
  },
};
</script>

<style  scope>
</style>
