<template>
    <el-dialog :title="titel" :visible.sync="visible" width="600px" top="6vh" @close="resetFormData" v-loading="loading"
        :close-on-click-modal="false">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px">
            <el-form-item label="角色名称:" prop="roleName">
                <el-input v-model.trim="formData.roleName" maxlength="30" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色编码:" prop="roleCode">
                <el-input v-model.trim="formData.roleCode" maxlength="30" placeholder="请输入角色编码"></el-input>
            </el-form-item>
            <el-form-item label="角色描述:" prop="roleDescribe">
                <el-input type="textarea" resize="none" :rows="4" v-model="formData.roleDescribe" maxlength="200"
                    placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item label="角色权限:">
                <el-tree ref="menuTree" :data="menuList" :props="treeProps" show-checkbox node-key="id" default-expand-all
                    check-strictly @check="onCheckChange">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <el-tag v-if="node.data.type == 1" size="mini">目录</el-tag>
                        <el-tag v-else-if="node.data.type == 2" type="warning" size="mini">菜单</el-tag>
                        <el-tag v-else type="danger" size="mini">按钮</el-tag>
                    </span>
                </el-tree>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { AddSysRole, UpdateSysRole, GetRoleMenuIds } from '@/api/sysRole'
import { GetSysMenuList } from '@/api/sysMenu'


export default {
    components: {
    },
    data() {
        return {
            titel: '',
            visible: false,
            loading: false,
            formData: {},
            rules: {
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
            },
            menuList: [],
            treeProps: { label: 'name', children: 'childrenList', disabled: this.disabledFunc }
        };
    },
    created() {
        this.getMenus();
    },
    methods: {
        async open(data) {
            if (data && data.id) {
                this.titel = '编辑角色'
                this.formData = { ...data }
                this.initMenuTreeChecked(data.id)
            } else {
                this.titel = '添加角色'
            }
            this.visible = true
        },
        //获取权限树数据
        getMenus() {
            GetSysMenuList().then(res => {
                this.menuList = res.data
            })
        },
        //提交表单
        submitForm() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.formData.menuIds = this.$refs.menuTree.getCheckedKeys()
                    if (this.formData.id) {//修改
                        UpdateSysRole(this.formData).then(res => {
                            if (res.data) {
                                this.$message.success("修改成功")
                                this.$emit('success')
                                this.visible = false
                            } else {
                                this.$message.error(res.msg)
                            }
                        }).finally(() => {
                            this.loading = false
                        })
                    } else {//添加
                        AddSysRole(this.formData).then(res => {
                            if (res.data) {
                                this.$message.success("添加成功")
                                this.$emit('success')
                                this.visible = false
                            } else {
                                this.$message.error(res.msg)
                            }
                        }).finally(() => {
                            this.loading = false
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetFormData() {
            //清空树的选中状态
            this.$refs.menuTree.setCheckedKeys([]);
            this.formData = {
                roleName: '',
                roleCode: '',
                roleDescribe: '',
                menuIds: [],
            }
        },
        //初始化菜单树的选中状态
        async initMenuTreeChecked(roleId) {
            this.loading = true
            await GetRoleMenuIds({ roleId }).then((res) => {
                this.$refs.menuTree.setCheckedKeys(res.data);
                this.loading = false
            });
        },
        //监听树节点选中状态
        onCheckChange(data) {
            const node = this.$refs.menuTree.getNode(data.id);
            if (node.checked) {
                //选中,递归设置所有父节点选中
                this.setParentChecked(node);
            } else {
                //取消选中，递归取消类型是目录的父节点
                this.setParentNoChecked(node);
                //取消选中,所有子节点取消选中
                this.setChildenNoChecked(node);
            }
        },
        //递归设置所有父节点选中
        setParentChecked(node) {
            if (node.parent) {
                node.parent.checked = true;
                this.setParentChecked(node.parent);
            }
        },
        //递归设置所有父节点取消选中
        setParentNoChecked(node) {
            //父节点有值 并且 父节点的数据对象类型为目录
            if (node.parent && node.parent.data.type == 1) {
                let parent = node.parent
                //目录父节点下的子节点没有一个选中的，取消目录父节点的选中
                if (!parent.childNodes.some(item => item.checked === true)) {
                    parent.checked = false
                    this.setParentNoChecked(parent)
                }
            }
        },
        //所有子节点取消选中
        setChildenNoChecked(node) {
            for (let i = 0; i < node.childNodes.length; i++) {
                node.childNodes[i].checked = false;
                this.setChildenNoChecked(node.childNodes[i]);
            }
        },
        //禁用校验-目录禁止选中
        disabledFunc(data, node) {
            return data.type === 1
        }
    },
}

</script>