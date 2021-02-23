<template>
  <div class="dialog">
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="dialogForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="dialogForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="dialogForm.role_id" placeholder="请选择角色">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUsers">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { editUser } from "@/api/user";
export default {
  name: "editDialog",
  data() {
    return {
      // 弹框表单是否显示
      dialogFormVisible: false,
      // 弹框表单元素宽度
      formLabelWidth: "70px",
      // 弹框元素
      dialogForm: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        state: "",
        remark: "",
        id: "",
      },
      // 弹框规则
      rules: {
        username: [
          { required: true, message: "请输入正确格式", trigger: "blue" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "change",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请输入11位手机号码",
            trigger: "change",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "请输入正确的邮箱地址",
            trigger: "change",
          },
        ],
        role_id: [
          { required: true, message: "请选择一位角色", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    editUsers() {
      // 弹框表单是否显示
      this.dialogFormVisible = false;
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          editUser({
            ...this.dialogForm,
          }).then(() => {
            this.$parent.getList();
            this.$message.success('修改成功靓仔')
            this.$refs.dialogForm.resetFields();
          });
        } else {
          this.$message.error('好好输入该死的靓仔')
          return false;
        }
      });
    },
  },
};
</script>

<style lang='less'>
// 弹出框样式
.el-dialog {
  width: 477px;
  height: 550px;
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
    padding-top: 25px;
  }
}
</style>