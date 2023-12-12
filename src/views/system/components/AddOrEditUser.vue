<template>
    <el-dialog :title="titel" :visible.sync="visible" width="600px" top="6vh" @close="resetFormData"
        :close-on-click-modal="false">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px">
            <el-form-item label="用户账号:" prop="userName">
                <el-input v-model.trim="formData.userName" placeholder="请输入用户账号" maxlength="30"
                    style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password" v-if="isAdd">
                <el-input type="password" placeholder="请输入密码" maxlength="16" v-model.trim="formData.password" show-password
                    style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="用户头像:" prop="userImg" class="logo">
                <upload :limit="1" :file-list="userImgList" @getUrl="getImgUrl($event)" @delUrl="deleteImg" drag />
            </el-form-item>
            <el-form-item label="用户角色:" prop="roleId">
                <el-select v-model="formData.roleId" placeholder="请选择用户角色" style="width: 250px;">
                    <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { AddSysUser, UpdateSysUser } from '@/api/sysUser'
import { ListAllRole } from '@/api/sysRole'
import Upload from '@/views/advertisement/components/Upload'
import { validatePassword } from '@/utils/validate'

export default {
    components: {
        Upload
    },
    data() {
        return {
            titel: '',
            isAdd: false,
            visible: false,
            formData: {},
            rules: {
                userName: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' }
                ],
            },
            userImgList: [],
            roleList: [],
        };
    },
    created() {
        //初始化角色选择框
        this.initRoleSelector()
    },
    methods: {
        open(data) {
            if (data && data.id) {
                this.isAdd = false
                this.titel = '编辑用户'
                if (data.userImg) {
                    this.userImgList = [{ url: data.userImg }]
                }
                this.formData = { ...data }
            } else {
                this.isAdd = true
                this.titel = '添加用户'
            }

            this.visible = true
        },
        //提交表单
        submitForm() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    if (this.formData.id) {//修改
                        UpdateSysUser(this.formData).then(res => {
                            if (res.data) {
                                this.$message.success("修改成功")
                                this.$emit('success')
                                this.visible = false
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {//添加
                        AddSysUser(this.formData).then(res => {
                            if (res.data) {
                                this.$message.success("添加成功")
                                this.$emit('success')
                                this.visible = false
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetFormData() {
            this.userImgList = []
            this.formData = {
                userName: '',
                password: '',
                userImg: '',
                roleId: '',
            }
        },
        //初始化角色选择框
        async initRoleSelector() {
            let { code, data } = await ListAllRole();
            if (code === 1000) {
                this.roleList = data
            }
        },
        //获取用户头像图片url
        getImgUrl(getUrl) {
            this.formData.userImg = getUrl
        },
        //删除用户头像图片url
        deleteImg() {
            this.formData.userImg = '';
        },
    }
}

</script>
