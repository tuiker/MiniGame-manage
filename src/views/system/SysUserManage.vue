<template>
    <div>
        <el-card shadow="never">
            <el-form :inline="true">
                <el-form-item label="用户ID" style="margin-bottom: 0px;">
                    <el-input v-model="queryParams.id" placeholder="输入用户ID进行查询"></el-input>
                </el-form-item>
                <el-form-item label="用户账号" style="margin-bottom: 0px;">
                    <el-input v-model="queryParams.userName" placeholder="输入用户账号进行查询"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;">
                    <el-button @click="onSerach">查询</el-button>
                    <el-button @click="onRefresh">刷新</el-button>
                    <el-button type="primary" v-permission="'addUser'" @click="addRow">添加</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <br>
        <el-table :data="tableData" row-key="id" v-loading="tableLoading" border
            :tree-props="{ children: 'childrenList', hasChildren: 'hasChildren' }" default-expand-all>
            <el-table-column label="用户ID" prop="id" min-width="120" align="center"></el-table-column>
            <el-table-column label="用户账号" prop="userName" min-width="120" align="center"></el-table-column>
            <el-table-column label="头像" prop="userImg" min-width="120" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.userImg" style="width: 40px; height: 40px" :src="scope.row.userImg"
                        :preview-src-list="[scope.row.userImg]"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="最近登录时间" prop="recentLoginTime" min-width="120" align="center"></el-table-column>
            <el-table-column label="创建人" prop="creator" min-width="120" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" min-width="120" align="center"></el-table-column>
            <el-table-column label="修改人" prop="updater" min-width="120" align="center"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime" min-width="120" align="center"></el-table-column>
            <el-table-column label="角色" prop="roleName" min-width="120" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.id == 1">超级管理员</span>
                    <span v-else>{{ scope.row.roleName }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="140" align="center">
                <template slot-scope="scope">
                    <template v-if="scope.row.id != 1">
                        <el-button v-permission="'editUser'" @click="editRow(scope.row)" type="text"
                            size="small">编辑</el-button>
                        <el-button v-permission="'updatePassword'" @click="updatePassword(scope.row)" type="text"
                            size="small">修改密码</el-button>
                        <el-button v-permission="'deleteUser'" @click="deleteRow(scope.row.id)" type="text" size="small"
                            style="color: red;">删除</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryParams.page" :page-sizes="[10, 20, 50, 100]" :page-size="queryParams.pageSize"
            layout="->,total, sizes, prev, pager, next, jumper" :total="queryParams.total">
        </el-pagination>

        <add-or-edit-user ref="addOrEditUserDialog" @success="getTableData"></add-or-edit-user>

        <el-dialog title="修改密码" :visible.sync="passwordFormvisible" width="600px">
            <el-form ref="passwordForm" :rules="passwordFormRules" :model="passwordFormData" label-width="100px">
                <el-form-item label="新密码:" prop="password">
                    <el-input placeholder="请输入新密码" v-model.trim="passwordFormData.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="passwordFormvisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPasswordForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { GetSysUserList, DeleteById, UpdateSysUserPassword } from '@/api/sysUser'
import AddOrEditUser from './components/AddOrEditUser.vue';
import { validatePassword } from '@/utils/validate'


export default {
    components: {
        AddOrEditUser
    },
    data() {
        return {
            tableData: [],
            tableLoading: false,
            queryParams: {
                id: '',
                userName: '',
                page: 1,
                total: 0,
                pageSize: 10,
            },
            passwordFormvisible: false,
            passwordFormData: {
                id: '',
                password: ''
            },
            passwordFormRules: {
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' }
                ],
            }
        }
    },

    created() {
        this.getTableData();
    },
    methods: {
        //获取数据概况表格数据
        getTableData() {
            this.tableLoading = true
            GetSysUserList(this.queryParams).then(res => {
                this.tableData = res.data.list
                this.queryParams.total = res.data.total
            }).finally(() => {
                this.tableLoading = false
            })
        },
        //查询
        onSerach() {
            this.queryParams.page = 1
            this.getTableData()
        },
        onRefresh() {
            this.queryParams = {
                id: '',
                userName: '',
                page: 1,
                total: 0,
                pageSize: 10,
            }
            this.getTableData()
        },
        //添加
        addRow() {
            this.$refs.addOrEditUserDialog.open()
        },
        //编辑行
        editRow(row) {
            this.$refs.addOrEditUserDialog.open(row)
        },
        //删除行
        deleteRow(id) {
            this.$confirm('是否确认删除该用户？', '确认信息', {
                distinguishCancelAndClose: true
            }).then(() => {
                DeleteById({ id: id }).then(() => {
                    this.$message.success("删除成功")
                    this.getTableData();
                })
            })
        },
        //打开修改密码对话框
        updatePassword(row) {
            this.passwordFormData.id = row.id
            this.passwordFormData.password = ''
            this.passwordFormvisible = true
        },
        //提交修改密码表单
        submitPasswordForm() {
            this.$refs.passwordForm.validate((valid) => {
                if (valid) {
                    UpdateSysUserPassword(this.passwordFormData).then(res => {
                        if (res.data) {
                            this.$message.success("修改成功")
                            this.passwordFormvisible = false
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleSizeChange(val) {
            this.queryParams.pageSize = val
            this.getTableData()
        },
        handleCurrentChange(val) {
            this.queryParams.page = val
            this.getTableData()
        },
    }
};
</script>
  