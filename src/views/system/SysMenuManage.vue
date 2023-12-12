<template>
    <div>
        <el-card shadow="never">
            <el-button type="primary" @click="addRow">添加</el-button>
        </el-card>
        <br>
        <el-table :data="tableData" row-key="id" v-loading="tableLoading" border
            :tree-props="{ children: 'childrenList', hasChildren: 'hasChildren' }" default-expand-all>
            <el-table-column label="名称" prop="name" min-width="120" align="center"></el-table-column>
            <el-table-column label="类型" prop="type" min-width="120" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type == 1">目录</el-tag>
                    <el-tag v-else-if="scope.row.type == 2" type="warning">菜单</el-tag>
                    <el-tag v-else type="danger">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="路由地址" prop="path" min-width="120" align="center"></el-table-column>
            <el-table-column label="组件路径 / 权限编码" prop="component" min-width="120" align="center"></el-table-column>
            <el-table-column label="图标" prop="icon" min-width="120" align="center">
                <template slot-scope="scope">
                    <i :class="scope.row.icon" style="font-size: 30px;"></i>
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort" min-width="120" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="140" align="center">
                <template slot-scope="scope">
                    <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteRow(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <add-or-edit-menu ref="addOrEditMenuDialog" :sysMenu="tableData" @success="getTableData"></add-or-edit-menu>
    </div>
</template>
<script>
import { GetSysMenuList, deleteByIds } from '@/api/sysMenu'
import AddOrEditMenu from './components/AddOrEditMenu.vue';

export default {
    components: {
        AddOrEditMenu
    },
    data() {
        return {
            tableData: [],
            tableLoading: false
        }
    },

    created() {
        this.getTableData();
    },
    methods: {
        //获取数据概况表格数据
        getTableData() {
            this.tableLoading = true
            GetSysMenuList().then(res => {
                this.tableData = res.data
            }).finally(() => {
                this.tableLoading = false
            })
        },
        //添加
        addRow() {
            this.$refs.addOrEditMenuDialog.open()
        },
        //编辑行
        editRow(row) {
            this.$refs.addOrEditMenuDialog.open(row)
        },
        //删除行
        deleteRow(row) {
            this.$confirm('是否确认删除该权限及其子权限？', '确认信息', {
                distinguishCancelAndClose: true
            }).then(() => {
                let ids = []
                this.getIds(row, ids)
                deleteByIds({ ids: ids.join(',') }).then(() => {
                    this.$message.success("删除成功")
                    this.getTableData();
                })
            })
        },
        //递归获取ID到数组中
        getIds(row, ids) {
            ids.push(row.id)
            if (row.childrenList && row.childrenList.length > 0) {
                row.childrenList.forEach(item => {
                    this.getIds(item, ids)
                })
            }
        }
    }
};
</script>
  