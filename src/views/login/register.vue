<template>
  <div id="register_style">
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      @close="resetFields"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="uplodsUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="username"
          :model="form"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
          prop="email"
          :model="form"
        >
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="15">
            <el-form-item
              label="图形码"
              :label-width="formLabelWidth"
              prop="code"
            >
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <img :src="registerUrl" alt="" @click="registerUrlClick" />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item
              label="验证码"
              :label-width="formLabelWidth"
              prop="phoneCode"
            >
              <el-input v-model="form.phoneCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button @click="getPhoneCode" :disabled="codeTime != 0">{{
              codeText
            }}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  registerUrl,
  registerPhoneCode,
  imgUploads,
  userRegister,
} from "../../api/register";
export default {
  data() {
    return {
      formLabelWidth: "70px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      imageUrl: "",
      registerUrl: registerUrl(),
      codeText: "获取用户验证码",
      codeTime: 0,
      uplodsUrl: imgUploads(),
      form: {
        avatar: "",
        name: "",
        code: "",
        phone: "",
        phoneCode: "",
        password: "",
        email: "",
      },
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
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位数的密码",
            trigger: "change",
          },
        ],
        phoneCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位数的验证码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 头像预览
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
    },
    // 上传头像
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "iamge/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    // 重新获取验证码
    registerUrlClick() {
      this.registerUrl = registerUrl();
    },

    // 获取手机验证码
    getPhoneCode() {
      this.$refs.form.validateField("phone", (err) => {
        if (err) {
          this.$message.error(err);
        } else {
          this.codeTime = 5;
          let timeID = setInterval(() => {
            this.codeTime--;
            this.codeText = `请${this.codeTime}秒后再次获取`;
            if (this.codeTime == 0) {
              clearInterval(timeID);
              this.codeText = "获取用户验证码";
            }
          }, 1000);
          registerPhoneCode({
            code: this.form.code,
            phone: this.form.phone,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              // this.$message.success(res.data.data.captcha);
              alert(res.data.data.captcha);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },

    // 完成注册按钮
    SubmitForm() {
      userRegister({
        username: this.form.username,
        phone: this.form.phone,
        email: this.form.email,
        avatar: this.form.avatar,
        password: this.form.password,
        rcode: this.form.phoneCode,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("注册成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 关闭时清空表单元素
    resetFields() {
      this.$refs.form.resetFields();
      this.imageUrl = "";
    },
  },
};
</script>

<style lang="less">
#register_style {
  .el-dialog {
    width: 603px;
    height: 786px;
    padding-left: -50px;
    // 头部标题
    .el-dialog__header {
      background: linear-gradient(to right, #01c5fa, #1394fa);
      // width: 600px;
      height: 53px;
      padding: 0;
      text-align: center;
    }
    .el-dialog__title {
      color: white;
      line-height: 53px;
    }

    // 表单
    .el-form {
      text-align: center;
      // 两个                      短小input
      .el-row {
        height: 40px;
        img {
          height: 100%;
          width: 143px;
        }
      }
      .el-col-15 {
        height: 60px;
      }

      // 头像组件
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    // 按钮居中
    .dialog-footer {
      text-align: center;
      margin-top: 40px;
    }
  }
}
</style>