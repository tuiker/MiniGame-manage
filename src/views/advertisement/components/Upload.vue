<template>
  <div>
    <el-upload :limit="limit" action :accept="accept" :on-change="uploadFile" list-type="picture-card"
      :auto-upload="false" :file-list="fileList" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove" ref="upload" class="avatar-uploader" :class="{ hide: showUpload }" :disabled="disabled">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog width="30%" :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrl.url" alt />
    </el-dialog>
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
    fileSize: {
      type: Number,
      default: 2
    },
    accept: {
      type: String,
      default: "image/*"
    }
  },
  data() {
    return {
      showUpload: false, //控制limit最大值之后 关闭上传按钮
      dialogVisible: false, //查看图片弹出框
      imgUrl: [], //上传图片后地址合集
    };
  },
  //监听上传图片的数组(为了处理修改时,自动渲染问题,和上传按钮消失问题);
  watch: {
    fileList(newName, oldName) {
      if (newName.length == this.limit) this.showUpload = true;
      else this.showUpload = false;
    },
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
      // const file = e.file; <- 这里是不需要直接上传而是通过按钮上传的
      const file = e.raw; // <- 这里是直接上传的
      //大小
      const size = file.size / 1024 / 1024;
      if (size > this.fileSize) {
        this.$notify.warning({
          title: "警告",
          message: "文件大小必须小于"+this.fileSize+"M",
        });
      } else {
        if (this.limit == 1) this.imgUrl = []; //此处判断为一张的时候需要清空数组
        let params = new FormData();
        params.append("files", file);
        UploadImg(params).then((res) => {
          this.$emit("getUrl", res.data[0]);
          //这里返回的数据结构(根据自己返回结构进行修改)
          // if (res.data.status === 1) {
          // this.$message.success("上传成功");
          // this.imgUrl = res.data;
          //调用父组件的方法来传递图片参数
          // this.$emit("getUrl", this.imgUrl);
          // } else this.$message.error("上传失败");
        });
      }
    },
    //文件超出个数限制时的函数
    handleExceed(files, fileList) {
      this.$message.info(`最多只允许上传${this.limit}张图片`);
    },
  },
};
</script>

<style  scope>
.hide .el-upload--picture-card {
  display: none !important;
}

.avatar-uploader>.el-upload {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 0px;
  background: #fff;
  border: 1px dashed #ccc;
}

.avatar-uploader>.el-upload>i {
  font-size: 28px;
  color: #ccc;
}

.avatar-uploader>.el-upload-list>.el-upload-list__item {
  width: 150px;
  height: 150px;
}

.avatar-uploader>.el-upload-list>.el-upload-list__item>img {
  width: 150px;
  height: 150px;
  border-radius: 0px;
}
/* 去除upload组件自带的动画效果 */
.el-upload-list__item {
  transition: none !important;
}
</style>
