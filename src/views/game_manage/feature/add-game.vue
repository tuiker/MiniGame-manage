<template>
  <div class="game">
    <!-- <div class="title">添加游戏</div> -->
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="200px">
      <!-- <el-form ref="ruleForm" :model="ruleForm" label-width="200px"> -->
      <el-form-item label="游戏名称:" prop="gameName">
        <el-input v-model="ruleForm.gameName" placeholder="请输入游戏名称" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="游戏载体:" prop="carrierId">
        <el-radio-group v-model="ruleForm.carrierId" v-for="item in CarrierList" :key="item.id">
          <el-radio :label=item.id>{{ item.carrierName }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="游戏类型:" prop="gameType">
        <el-radio-group v-model="ruleForm.gameType" v-for="item in GameTypeList" :key="item.id">
          <el-radio :label=item.id>{{ item.typeName }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="游戏语言:" prop="languageId">
        <el-radio-group v-model="ruleForm.languageId" v-for="item in LanguageList" :key="item.id">
          <el-radio :label=item.id>{{ item.languageName }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持视频广告:" prop="supportVideo">
        <el-radio v-model="ruleForm.supportVideo" :label="1">是</el-radio>
        <el-radio v-model="ruleForm.supportVideo" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="广告位置" prop="advPositionIdsArray">
        <el-checkbox-group v-model="ruleForm.advPositionIdsArray">
          <el-checkbox v-for="(item, index) in AdPositionIds" :key="index" :label="item.id">{{
            item.advPositionName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="游戏LOGO:" prop="gameLogo" class="logo">
        <upload :limit="1" :file-list="logoImgList" @getUrl="getLogoUrl($event)" />
      </el-form-item>
      <el-form-item label="游戏主图:" prop="gameImg">
        <upload :limit="1" :file-list="mapImgList" @getUrl="getMasterUrl($event)" />
      </el-form-item>
      <el-form-item label="活动描述" prop="gameDesc">
        <el-input type="textarea" resize="none" :rows="4" maxlength="200" v-model="ruleForm.gameDesc" placeholder="请输入"
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
import Upload from '../components/Upload.vue'
import { GetLanguage, GetGameType, GetCarrier, GetADPosition } from '@/api/tool'
import { AddGame } from '@/api/game'

export default {
  data() {
    return {
      logoImgList: [],
      mapImgList: [],
      CarrierList: [],
      GameTypeList: [],
      LanguageList: [],
      AdPositionIds: [],
      ruleForm: {
        createId: 1,
        gameName: '',
        carrierId: '',
        gameType: '',
        languageId: '',
        supportVideo: 1,
        advPositionIds: [],
        advPositionIdsArray: [],
        gameLogo: '',
        gameImg: '',
        gameDesc: ''
      },
      rules: {
        gameName: [
          { required: true, message: '请输入游戏名称', trigger: 'blur' },
        ],
        carrierId: [
          { required: true, message: '请选择游戏载体', trigger: 'change' }
        ],
        gameType: [
          { required: true, message: '请选择游戏类型', trigger: 'change' }
        ],
        languageId: [
          { required: true, message: '请选择游戏语言', trigger: 'change' }
        ],
        advPositionIdsArray: [
          { type: 'array', required: true, message: '请至少选择一个广告位置', trigger: 'change' }
        ],
        gameLogo: [{ required: true, message: '请上传游戏LOGO', trigger: 'change' }],
        gameImg: [{ required: true, message: '请上传游戏主图', trigger: 'change' }],
        gameDesc: [
          { required: true, message: '请填写活动描述', trigger: 'blur' }
        ],
        supportVideo: [
          { required: true, message: '请选择是否支持视频广告', trigger: 'change' }
        ],
      },
      imageUrl: '',
      describe: '',
    }
  },
  components: {
    Upload
  },
  created() {
    //获取载体
    GetCarrier().then(res => {
      this.CarrierList = res.data
    })
    //获取游戏类型
    GetGameType().then(res => {
      this.GameTypeList = res.data
    })
    //获取语言
    GetLanguage().then(res => {
      this.LanguageList = res.data
    })
    //获取广告位置
    GetADPosition().then(res => {
      this.AdPositionIds = res.data
    })
  },
  methods: {
    //提交
    submitForm(formName) {
      let AdPositionIds = this.ruleForm.advPositionIdsArray.toString()
      this.ruleForm.advPositionIds = AdPositionIds
      console.log(AdPositionIds, 'zzz');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddGame(this.ruleForm).then(res => {
            this.$message.success("保存成功");
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
    getLogoUrl(getUrl) {
      this.ruleForm.gameLogo = getUrl
      this.$refs.ruleForm.validateField('fileList')
    },
    getMasterUrl(getUrl) {
      this.ruleForm.gameImg = getUrl
      this.$refs.ruleForm.validateField('fileList')
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

    .logo {
      .el-upload {
        width: 100px;
        height: 100px;
        line-height: 100px;
      }

      .avatar-uploader>.el-upload-list>.el-upload-list__item {
        width: 100px;
        height: 100px;
      }

      .avatar-uploader>.el-upload-list>.el-upload-list__item>img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
