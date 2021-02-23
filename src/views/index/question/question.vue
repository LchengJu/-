<template>
  <div id="question_container">
    <div class="box_top">
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科" prop="subject">
            <subjectList v-model="formInline.subject"></subjectList>
          </el-form-item>
          <el-form-item label="阶段" prop="step">
            <el-select v-model="formInline.step" placeholder="请选择阶段">
              <el-option label="初级" value="1"></el-option>
              <el-option label="中级" value="2"></el-option>
              <el-option label="高级" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" prop="enterprise">
            <companyList v-model="formInline.enterprise"></companyList>
          </el-form-item>
          <el-form-item label="题型" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择题型">
              <el-option label="单选" value="1"></el-option>
              <el-option label="多选" value="2"></el-option>
              <el-option label="简答" value="3"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="难度" prop="difficulty">
            <el-select v-model="formInline.difficulty" placeholder="请选择难度">
              <el-option label="简单" value="1"></el-option>
              <el-option label="一般" value="2"></el-option>
              <el-option label="困难" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="作者" prop="username">
            <el-input v-model="formInline.username"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="create_date">
            <el-date-picker
              v-model="formInline.create_date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <br />

          <el-form-item label="标题">
            <el-input v-model="formInline.title" class="title"></el-input>
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
              新增试题
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="box_bottom">
      <el-card class="box-card">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="num" label="序号" width="180" type="index">
          </el-table-column>
          <el-table-column prop="title" label="题目" width="180">
            <template slot-scope="scope">
              <span v-html="scope.row.title"></span>
            </template>
          </el-table-column>
          <el-table-column prop="subject_name" label="学科.阶段">
            <template slot-scope="scope">
              {{ scope.row.subject_name + "·" + subjectStep[scope.row.step] }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="题型">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">单选</span>
              <span v-else-if="scope.row.type == 2">多选</span>
              <span v-else>简答</span>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise_name" label="企业">
          </el-table-column>
          <el-table-column prop="username" label="创建者"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color: #ff3d3d"
                >禁用</span
              >
              <span v-else>启用</span>
            </template>
          </el-table-column>
          <el-table-column prop="reads" label="访问量"> </el-table-column>
          <el-table-column prop="operation " label="操作">
            <template slot-scope="scope">
              <el-button @click="editQuestion(scope.row)" type="text"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="start(scope.row)">
                {{ scope.row.status == 1 ? "禁用" : "启用" }}
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
import {
  getQuestion,
  removeQuestion,
  changeQuestionStatus,
} from "../../../api/question";
import subjectList from "./subjectList";
import companyList from "./companyList";
import {deepClone} from '../../../utils/tools.js'
export default {
  name: "question",
  components: {
    addDialog,
    subjectList,
    companyList,
    editDialog,
  },
  data() {
    return {
      // 学科阶段
      subjectStep: {
        1: "初级",
        2: "中级",
        3: "高级",
      },
      // 当前页有几条
      pageSizes: [1, 10, 15, 20, 22],
      // 默认当前页的数量
      pageSize: 10,
      // 总共几条
      pageTotal: 100,
      // 当前页数
      currentPage: 1,
      formInline: {
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: "",
        title: "",
      },
      tableData: [],
    };
  },
  methods: {
    // 获取题库列表
    getList() {
      getQuestion({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formInline,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.pageTotal = res.data.data.pagination.total;
      });
    },
    // 清除搜索框内容
    clear() {
      this.formInline = {
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: "",
        title: "",
      };
    },
    // 删除数据
    remove(item) {
      this.$confirm("老大，要我干掉他？", "密令", {
        confirmButtonText: "干掉",
        cancelButtonText: "放过他",
        type: "warning",
      })
        .then(() => {
          removeQuestion({
            id: item.id,
          }).then(() => {
            this.$message.success("干掉了老大");
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
    // 设置启用禁用
    start(item) {
      changeQuestionStatus({ id: item.id }).then(() => {
        this.$message.success("修改成功");
        this.getList();
      });
    },
    onSubmit() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    editQuestion(row) {
      const clone = deepClone(row)
      clone.city = clone.city.split(',')
      clone.multiple_select_answer	= clone.multiple_select_answer.split(',')
      this.$refs.editDialog.dialogFormVisible = true;
      this.$refs.editDialog.ruleForm = clone
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
    // 省市区三级联动
    handleChange(value) {
      console.log(value);
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang='less'>
#question_container {
  .box-card {
    margin-bottom: 11px;
  }
  .box_top {
    .el-input {
      width: 150px;
    }
    .el-input.title {
      width: 450px;
    }
  }

  // 分页盒子
  .block {
    text-align: center;
    margin-top: 30px;
  }
  .el-form-item__label {
    margin: auto 30px;
    padding: 0;
  }
}
</style>

