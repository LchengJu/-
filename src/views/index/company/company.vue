<template>
  <div id="company_container">
    <div class="box_top">
      <el-card class="box-card">
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="企业编号" prop="eid">
            <el-input v-model="formInline.eid"></el-input>
          </el-form-item>

          <el-form-item label="企业名称" prop="name">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="创建者" prop="username">
            <el-input v-model="formInline.username"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
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
              新增企业
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <addDialog ref="addDialog"></addDialog>
      <editDialog ref="editDialog"></editDialog>
    </div>
    <div class="box_button">
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="num" label="序号" width="180" type="index">
          </el-table-column>
          <el-table-column prop="eid" label="企业编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="企业名称"> </el-table-column>
          <el-table-column prop="short_name" label="简称"> </el-table-column>
          <el-table-column prop="username" label="创建者"> </el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope" prop="update_time">
              {{ scope.row.update_time | getData }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else style="color: #ff3d3d">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="start(scope.row)">{{
                scope.row.status == 1 ? "启用" : "禁用"
              }}</el-button>
              <el-button type="text" size="small" @click="remove(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
            background
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getEnterprise,
  removeEnterprise,
  changeEnterpriseStatus,
} from "@/api/company.js";
import addDialog from "./addDialog";
import editDialog from "./editDialog";
// import moment from "moment";
// 定义一个深拷贝函数  接收目标target参数
import {deepClone} from '@/utils/tools'
export default {
  components: {
    addDialog,
    editDialog,
  },
  name: "company",
  data() {
    return {
      // 当前页有几条
      pageSizes: [1, 10, 15, 20, 22],
      // 默认当前页的数量
      pageSize: 10,
      // 总共几条
      pageTotal: 1,
      // 当前页数
      currentPage: 1,
      formInline: {
        name: "",
        eid: "",
        username: "",
        status: "",
      },
      // 表格数据
      tableData: [{}],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 渲染企业列表
    getList() {
      getEnterprise({
        limit: this.pageSize,
        page: this.currentPage,
        ...this.formInline,
      }).then((res) => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.pageTotal = res.data.data.pagination.total;
      });
    },
    // 增加企业小弹窗
    onSubmit() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    // 编辑事件
    handleClick(item) {
      // console.log(item);
      const cloneItmen = deepClone(item);
      this.$refs.editDialog.form = cloneItmen;
      this.$refs.editDialog.dialogFormVisible = true;
    },
    // 删除事件
    remove(item) {
      this.$confirm("此操作将永久删除此企业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeEnterprise({ id: item.id }).then((res) => {
            console.log(res);
            this.$message.success("删除成功");
            const totalpage = Math.ceil(this.pageTotal / this.pageSize);
            if (totalpage == this.currentPage) {
              if (this.tableData.length == 1) {
                this.currentPage--;
                if (this.currentPage == 0) {
                  this.currentPage == 1;
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
    // 切换禁用启用
    start(item) {
      changeEnterpriseStatus({ id: item.id }).then((res) => {
        this.$message.success("状态修改成功");
        console.log(res);
        this.getList();
      });
    },
    // 分页的每页事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 分页的当前页事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    // 清空搜索框
    clear() {
      this.$refs.formInline.resetFields();
    },
  },

};
</script>

<style lang="less">
#company_container {
  .box_button {
    margin-top: 11px;
    .block {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>