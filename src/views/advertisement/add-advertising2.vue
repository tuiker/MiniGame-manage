<template>
  <div class="game">
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="200px">
      <el-form-item label="广告名称:" prop="advName" placeholder="请输入广告名称">
        <el-input v-model="ruleForm.advName" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型:" prop="advTypeId">
        <el-radio-group v-model="ruleForm.advTypeId" v-for="item in GameTypeList" :key="item.id">
          <el-radio :label=item.id>{{ item.typeName }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告封面:" prop="advImg">
        <upload :limit="1" :file-list="advImgList" @getUrl="getadImgUrl($event)" />
      </el-form-item>
      <el-form-item label="广告地址:" prop="advUrl">
        <el-input type="textarea" resize="none" :rows="4" maxlength="200" v-model="ruleForm.advUrl" placeholder="请输入"
          style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button style="margin-left: 30px;" @click="Back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Upload from './components/Upload.vue'
import { GetGameType } from '@/api/tool'
import { AddAdv } from '@/api/advertisement'

export default {
  data() {
    return {
      advImgList: [],
      CarrierList: [],
      GameTypeList: [],
      LanguageList: [],
      AdPositionIds: [],
      ruleForm: {
        "advName": '',
        "advTypeId":'',
        "advImg":'',
        "advUrl":''
      },
      rules: {
        advName: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
        ],
        advTypeId: [
          { required: true, message: '请选择游戏类型', trigger: 'change' }
        ],
        advImg: [{ required: true, message: '请上传广告封面', trigger: 'change' }],
        advUrl: [
          { required: true, message: '请填写广告地址', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      describe: '',
    }
  },
  components: {
    Upload
  },
  created() {
    //获取游戏类型
    GetGameType().then(res => {
      this.GameTypeList = res.data
    })
  },
  methods: {
    //提交
    submitForm(formName) {
      let instance = this;
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {

          AddAdv(instance.ruleForm).then(res => {
            console.log(res);
            this.Back()
          })
        } else {
          return false;
        }
      });
    },
    //返回
    Back() {
      this.$router.go(-1)
    },
    getadImgUrl(getUrl) {
      this.ruleForm.advImg = getUrl
      this.$refs.ruleForm.validateField('fileList') // 手动触发fileList校验规则
    }
  }
}
</script>
<style lang="scss">
.game {
  padding: 32px;
  background-color: #fff;

  .title {
    font-size: 16px;
    color: rgba(144, 147, 153, 1);
    font-weight: 800;
    margin-bottom: 20px;
  }

  .el-form {

    .el-form-item {
      margin-bottom: 20px;
    }

    .el-radio {
      margin-right: 50px;
    }

    .el-form-item__label {
      font-size: 16px;
      color: #131414;
      padding-right: 28px;
    }

    .el-button {
      width: 150px;
      padding: 12px 20px;
      margin-top: 40px;
    }
  }
}
</style>
