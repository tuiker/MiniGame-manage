<template>
  <el-dialog title="数据追踪" :visible.sync="dialogVisible" width="1200px">
    <el-form ref="dataForm" :model="fromData" label-width="100px">
      <el-form-item prop="scriptDesc" label="脚本内容：" :rules="{ required: true, message: '请输入脚本内容', trigger: 'blur' }">
        <el-input type="textarea" :rows="8" v-model="fromData.scriptDesc" placeholder="请输入脚本内容"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveScript">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { SaveGameScriptDesc } from '@/api/game'

export default {
  name: "AddScriptForm",
  data() {
    return {
      dialogVisible: false,
      fromData: {
        gameId: null,
        scriptDesc: ''
      }
    };
  },
  methods: {
    //打开插入脚本对话框
    open(gameInfo) {
      let self = this;
      //初始化表单
      self.fromData.gameId = gameInfo.id;
      self.fromData.scriptDesc = gameInfo.scriptDesc;
      //打开对话框
      self.dialogVisible = true;
    },
    //保存脚本
    saveScript() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          SaveGameScriptDesc(this.fromData).then(res => {
            //关闭对话框
            this.dialogVisible = false;
            this.$message.success("保存成功");
            //提交成功事件至父组件，刷新表格
            this.$emit("success");
          })
        } else {
          return false;
        }
      });
    }
  },
};
</script>