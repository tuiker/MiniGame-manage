<template>
  <div class="from">
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="200px">
      <el-form-item label="游戏名称：">
        <el-input type="text" class="input" v-model="gameData.gameName" :readonly="true">123456</el-input>
      </el-form-item>
      <el-form-item label="游戏类型：">
        <el-input type="text" class="input" v-model="gameData.gameTypeName" :readonly="true">123456</el-input>
      </el-form-item>
      <el-form-item label="游戏LOGO：">
        <el-image style="width: 140px;" :src="gameData.gameLogo"></el-image>
      </el-form-item>
      <el-form-item label="广告位置" prop="positionId">
        <el-select v-model="ruleForm.positionId" placeholder="请选择活动区域">
          <el-option v-for="item in advPosition" :key="item.id" :label="item.advPositionName"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告内容" prop="advId">
        <el-select v-model="ruleForm.advId" placeholder="请选择活动区域">
          <el-option v-for="item in advCentent" :key="item.id" :label="item.advName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告时间" prop="date" :rules="{ required: true, message: '请选择广告时间', trigger: 'change' }">
        <el-date-picker v-model="ruleForm.date" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button style="margin-left: 30px;" @click="Back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetAdvListForGame, GetGameType, GetADPosition } from '@/api/tool'
import { GameAdv } from '@/api/game'
export default {
  data() {
    return {
      advPosition: [],
      advCentent: [],
      ruleForm: {
        gameId: 1,
        advId: '',
        positionId: '',
        advStartTime: '',
        advEndTime: '',
        date: null,
      },
      rules: {
        positionId: [
          { required: true, message: '请选择广告位置', trigger: 'change' },
        ],
        advId: [
          { required: true, message: '请选择广告内容', trigger: 'change' }
        ],
        advEndTime: [
          { required: true, message: '请选择广告时间', trigger: 'change' }
        ]
      },
      value1: '',
      gameData: {},
    }
  },
  created() {
    let self = this;
    self.gameData = self.$route.query
    self.ruleForm.gameId = JSON.parse(self.gameData.id)
    //游戏类型
    GetGameType().then(res => {
      if (res.data && res.data.length > 0) {
        res.data.forEach(item => {
          if (item.id == self.gameData.gameType) {
            self.gameData.gameTypeName = item.typeName;
          }
        });
      }
    })

    let arr = self.gameData.advPositionIds.split(',');
    //广告位置
    self.advPosition = []
    GetADPosition().then(res => {
      if (res.data && res.data.length > 0) {
        res.data.forEach(item => {
          if (arr.some(positionId => positionId == item.id)) {
            self.advPosition.push({ id: item.id, advPositionName: item.advPositionName })
          }
        });
      }
    })
    //广告内容 
    //supportVideo=1支持视频广告，查询全部广告
    //supportVideo=2不支持视频广告，查询图片广告
    GetAdvListForGame({ imgType: self.gameData.supportVideo == 1 ? null : 1 }).then(res => {
      self.advCentent = res.data
    })
  },
  methods: {
    submitForm(formName) {

      if (this.ruleForm.date && this.ruleForm.date.length === 2) {
        this.ruleForm.advStartTime = this.ruleForm.date[0]
        this.ruleForm.advEndTime = this.ruleForm.date[1]
      } else {
        this.ruleForm.date = null
        this.ruleForm.advStartTime = ''
        this.ruleForm.advEndTime = ''
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          GameAdv(this.ruleForm).then(res => {
            this.$message.success("植入成功");
            this.Back()
          })
        } else {
          return false;
        }
      })
    },
    //返回
    Back() {
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
.from {
  padding: 32px;
  background-color: #fff;

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
