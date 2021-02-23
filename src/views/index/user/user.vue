<template>
  <div id="user_container">
    <div class="box_top">
      <el-card class="box-card">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          ref="formInline"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="formInline.username"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formInline.email"></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="role_id">
            <el-select v-model="formInline.role_id" placeholder="请选择用户">
              <el-option label="管理员" value="2"></el-option>
              <el-option label="老师" value="3"></el-option>
              <el-option label="学生" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clear">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              <i class="el-icon-plus"></i>
              新增用户
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="box_bottom">
      <el-card class="box-card">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="180" type="index">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="role" label="角色">
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.role_id == 2">管理员</span>
              <span v-else-if="scope.row.role_id == 3">老师</span>
              <span v-else>学生</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else style="color: #ff3d3d">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="['超级管理员'].includes(this.$store.state.userInfo.role)">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="start(scope.row)">
                {{ scope.row.status == 1 ? "禁用 " : "启用" }}
              </el-button>
              <el-button type="text" size="small" @click="remove(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <addDialog ref="addDialog"></addDialog>
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
import addDialog from "./addDialog";
import editDialog from "./editDialog";
import { deepClone } from "../../../utils/tools";
import { getUser, removeUser, changeUserStatus } from "@/api/user";
export default {
  components: {
    addDialog,
    editDialog,
  },
  name: "user",
  data() {
    return {
      // 弹框表单是否显示
      dialogFormVisible: false,
      // 弹框表单元素宽度
      formLabelWidth: "70px",
      // 当前页有几条
      pageSizes: [1,10, 15, 20, 22],
      // 默认当前页的数量
      pageSize: 10,
      // 总共几条
      pageTotal: 100,
      // 当前页数
      currentPage: 1,
      formInline: {
        username: "",
        role_id: "",
        email: "",
      },

      // 表单元素
      tableData: [],
    };
  },
  methods: {
    // 获取用户列表
    getList() {
      getUser({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formInline,
      }).then((res) => {
        this.tableData = res.data.data.items;
        this.pageTotal = res.data.data.pagination.total;
      });
    },
    // 弹出聊天框
    onSubmit() {
      console.log("submit!");
      this.$refs.addDialog.dialogFormVisible = true;
    },
    // 清空条件表单
    clear() {
      this.$refs.formInline.resetFields();
    },
    // 设置启用或禁用状态
    start(item) {
      console.log(item);
      changeUserStatus({ id: item.id }).then(() => {
        this.getList();
      });
    },
    // 删除用户
    remove(item) {
      this.$confirm("老板要我干掉他?", "圣旨", {
        confirmButtonText: "干掉",
        cancelButtonText: "点另一个",
        type: "warning",
      })
        .then(() => {
          this.$message.success("干掉了");
          removeUser({ id: item.id }).then(() => {
            const totalpage = Math.ceil(this.pageTotal / this.pageSize);
            if (totalpage == this.currentPage) {
              if (this.tableData.length == 1) {
                this.currentPage--;
                if (this.currentPage == 0) {
                  this.currentPage = 1;
                }
              }
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(row) {
      this.$refs.editDialog.dialogFormVisible = true;
      const cloneData = deepClone(row);
      this.$refs.editDialog.dialogForm = cloneData;
    },
    // 分页的每页事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    // 分页的当前页事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less">
#user_container {
  // 分页组件
  .block {
    text-align: center;
    margin-top: 30px;
  }
  .box_bottom {
    margin-top: 11px;
  }
}
</style>


