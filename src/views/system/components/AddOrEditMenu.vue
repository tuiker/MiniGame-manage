<template>
    <el-dialog :title="titel" :visible.sync="visible" width="800px" top="6vh" :close-on-click-modal="false">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px">
            <el-form-item label="上级权限:" prop="parentId">
                <el-cascader v-model="formData.parentId" :options="cascaderOptions" :props="cascaderProps"
                    style="width: 100%;"></el-cascader>
            </el-form-item>
            <el-form-item label="权限名称:" prop="name">
                <el-input v-model="formData.name" maxlength="30" placeholder="请输入权限名称"></el-input>
            </el-form-item>
            <el-form-item label="权限类型:" prop="type">
                <el-radio-group v-model="formData.type" @change="typeChange">
                    <el-radio :label="1">目录</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                    <el-radio :label="3">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="formData.type != 3" label="路由地址:" prop="path">
                <el-input v-model="formData.path" placeholder="请输入路由地址" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type == 2" label="组件路径:" prop="component" :rules="componentRules">
                <el-input v-model="formData.component" placeholder="请输入组件路径" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type == 3" label="权限编码:" prop="component"
                :rules="[{ required: true, message: '请输入权限编码', trigger: 'blur' }]">
                <el-input v-model="formData.component" placeholder="请输入权限编码" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type != 3" label="菜单图标:" prop="icon">
                <el-input v-model="formData.icon" placeholder="请输入菜单图标标识" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序:" prop="sort">
                <el-input v-model="formData.sort" placeholder="请输入显示顺序" maxlength="3"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type != 3" label="是否隐藏:" prop="hidden">
                <el-radio-group v-model="formData.hidden">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { AddSysMenu, UpdateSysMenu } from '@/api/sysMenu'

const validatePath = (rule, value, callback) => {
    if (!value || value.indexOf('/') != 0) {
        callback(new Error('请输入一个以“/”开头的路由地址'));
    } else {
        callback();
    }
}
const validateComponent = (rule, value, callback) => {
    if (!value || value.indexOf('/') != 0) {
        callback(new Error('请输入一个以“/”开头的组件路径'));
    } else {
        callback();
    }
}

export default {
    props: {
        sysMenu: Array
    },
    data() {
        return {
            titel: '',
            visible: false,
            formData: {},
            rules: {
                name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
                parentId: [{ required: true, message: '请选择上级权限', trigger: 'change' }],
                path: [{ required: true, validator: validatePath, trigger: 'blur' }],
            },
            componentRules: [{ required: true, validator: validateComponent, trigger: 'blur' }],
            cascaderOptions: [{ id: -1, name: '根目录', childrenList: [] }],
            cascaderProps: { checkStrictly: true, emitPath: false, value: 'id', label: 'name', children: 'childrenList' }
        };
    },
    methods: {
        open(data) {
            this.resetFormData();
            this.initOptions()
            if (data && data.id) {
                this.titel = '编辑'
                this.formData = { ...data }
            } else {
                this.titel = '添加'
            }

            this.visible = true
        },
        //提交表单
        submitForm() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    if (this.formData.id) {//修改
                        UpdateSysMenu(this.formData).then(res => {
                            this.$message.success("修改成功")
                            this.$emit('success')
                            this.visible = false
                        })
                    } else {//添加
                        AddSysMenu(this.formData).then(res => {
                            this.$message.success("添加成功")
                            this.$emit('success')
                            this.visible = false
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetFormData() {
            this.formData = {
                name: '',
                type: 1,
                parentId: -1,
                path: '',
                component: '',
                icon: '',
                sort: '',
                hidden: 0,
            }
        },
        //初始化上级权限级联选择器
        initOptions() {
            this.cascaderOptions[0].childrenList = this.sysMenu
        },
        typeChange() {
            this.$refs.dataForm.clearValidate();
        },
    },
}

</script>