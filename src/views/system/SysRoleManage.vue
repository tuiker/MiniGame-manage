<template>
    <div>
        <el-card shadow="never">
            <el-form :inline="true">
                <el-form-item style="margin-bottom: 0px;">
                    <el-button type="primary" v-permission="'addRole'" @click="addRow">添加</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <br>
        <el-table :data="tableData" row-key="id" v-loading="tableLoading" border
            :tree-props="{ children: 'childrenList', hasChildren: 'hasChildren' }" default-expand-all>
            <el-table-column label="角色id" prop="id" min-width="120" align="center"></el-table-column>
            <el-table-column label="角色名称" prop="roleName" min-width="120" align="center"></el-table-column>
            <el-table-column label="角色编码" prop="roleCode" min-width="120" align="center"></el-table-column>
            <el-table-column label="角色描述" prop="roleDescribe" min-width="120" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="140" align="center">
                <template slot-scope="scope">
                    <el-button v-permission="'editRole'" @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-permission="'deleteRole'" @click="deleteRow(scope.row.id)" type="text" size="small"
                        style="color: red;">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryParams.page" :page-sizes="[10, 20, 50, 100]" :page-size="queryParams.pageSize"
            layout="->,total, sizes, prev, pager, next, jumper" :total="queryParams.total">
        </el-pagination>


        <add-or-edit-role ref="addOrEditRoleDialog" @success="getTableData"></add-or-edit-role>
    </div>
</template>
<script>
import { GetSysRoleList, DeleteById } from '@/api/sysRole'
import AddOrEditRole from './components/AddOrEditRole.vue';
export default {
    components: {
        AddOrEditRole
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
        }
    },

    created() {
        this.getTableData();
    },
    methods: {
        //获取数据概况表格数据
        getTableData() {
            this.tableLoading = true
            GetSysRoleList(this.queryParams).then(res => {
                this.tableData = res.data.list
                this.queryParams.total = res.data.total
            }).finally(() => {
                this.tableLoading = false
            })
        },
        //添加
        addRow() {
            this.$refs.addOrEditRoleDialog.open()
        },
        //编辑行
        editRow(row) {
            this.$refs.addOrEditRoleDialog.open(row)
        },
        //删除行
        deleteRow(id) {
            this.$confirm('是否确认删除该角色？', '确认信息', {
                distinguishCancelAndClose: true
            }).then(() => {
                DeleteById({ id: id }).then((res) => {
                    if (res.data) {
                        this.$message.success("删除成功")
                        this.getTableData();
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            })
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
  