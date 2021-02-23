<template>
  <div class="dialog">
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="editform">
        <el-form-item
          label="学科编号"
          :label-width="formLabelWidth"
          prop="rid"
          :rules="[
            { required: true, message: '请输入学科编号', trigger: 'change' },
          ]"
        >
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="学科名称"
          :label-width="formLabelWidth"
          prop="name"
          :rules="[
            { required: true, message: '请输入学科名称', trigger: 'change' },
          ]"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubect">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editSubject } from "@/api/subject";
export default {
  name: "addDialog",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      // dialog表单数据
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
      },
    };
  },
  methods: {
    addSubect() {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          editSubject({ ...this.form }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: "恭喜你，修改成功",
                type: "success",
              });
              this.dialogFormVisible = false;
              this.$parent.getList();
            } else {
              this.$message({
                message: res.data.message,
                type: "warning",
              });
            }
          });
        } else {
          this.$message({
            message:'请正确输入数据',
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less">
.el-dialog {
  width: 600px;
  height: 503px;
  background: #ffffff;
  box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c4fa, #1394fa);
    padding: 0;
    line-height: 54px;
  }

  .el-dialog__title {
    color: white;
  }

  .el-dialog__body {
    padding-bottom: 0;
  }

  .el-dialog__footer {
    padding-top: 0;
    text-align: center;
    margin-top: 50px;
  }
}
</style>